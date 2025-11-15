import { message } from "antd";
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
  type InternalAxiosRequestConfig, // <<< ĐÃ THÊM IMPORT NÀY
} from "axios";

// 1. Định nghĩa các kiểu dữ liệu cho môi trường và cấu hình
const key: string = import.meta.env.VITE_KEY || "";
const author: string = import.meta.env.VITE_AUTHOR || "";
const version: string = import.meta.env.VITE_VERSION || "";
const host: string = import.meta.env.VITE_HOST || "";
const DEFAULT_DEBOUNCE_DELAY: number = 100;
const debugMode: boolean = import.meta.env.VITE_DEBUGMODE === "development";
const DEFAULT_DELAY: number = 100;

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  metadata?: {
    startTime: Date;
  };
}
// 2. Khởi tạo Axios Instance
const api: AxiosInstance = axios.create({
  baseURL: host + "/hr-pro",
  timeout: 10000,
});
// Lưu trữ các AbortController và Debounce Timer
const abortControllers: Record<string, AbortController> = {};
const debounceTimers: Record<string, number> = {};
// 3. Interceptors (Bộ chặn)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): CustomRequestConfig => {
    const customConfig = config as CustomRequestConfig;
    customConfig.metadata = { startTime: new Date() };
    return customConfig; // Trả về customConfig
  },
  (error: AxiosError) => {
    if (debugMode) console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    const customConfig = response.config as CustomRequestConfig;
    const start = customConfig.metadata?.startTime;
    const duration = start ? new Date().getTime() - start.getTime() : "N/A";
    if (debugMode) {
      console.log(`✅ [RESPONSE] ${response.config.url} took ${duration} ms`);
    }
    return response;
  },
  (error: AxiosError) => {
    const config = (error.config as CustomRequestConfig) || {};
    const url = config.url || "unknown";
    const start = config.metadata?.startTime;
    const duration = start ? new Date().getTime() - start.getTime() : "N/A";

    if (axios.isCancel(error)) {
      if (debugMode) {
        console.warn(`⚠️ [CANCELLED] ${url} after ${duration} ms`);
      }
    } else {
      if (debugMode) {
        console.error(
          `❌ [ERROR] ${url} failed after ${duration} ms`,
          error.message
        );
      }
    }
    return Promise.reject(error);
  }
);

// 4. Các hàm hỗ trợ
function clearPrevious(url: string): void {
  // Đã bỏ casting (as NodeJS.Timeout)
  if (debounceTimers[url]) clearTimeout(debounceTimers[url]);
  if (abortControllers[url]) {
    abortControllers[url].abort();
    if (debugMode) console.warn(`🛑 Cancelled previous request to ${url}`);
  }
}

function buildHeaders(
  token: string,
  extraHeaders: Record<string, string> = {}
): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    ApplicationKey: key,
    ...extraHeaders,
  };
}
type ApiResponse<T = any> = Promise<T>;
const createDebouncedRequest = <T = any>(
  method: "get" | "post" | "patch" | "delete",
  url: string,
  dataOrHeaders: any, // data (for post/patch) or headers (for gets)
  tokenOrDelay: string | number, // token (for all except gets) or delay (for gets)
  delay?: number
): ApiResponse<T> => {
  let finalDelay: number;
  let headers: Record<string, string> = {};
  let data: any = undefined;
  if (method === "get") {
    // debounceGets: (url, headers, delay)
    headers = dataOrHeaders as Record<string, string>;
    finalDelay = tokenOrDelay as number;
  } else {
    // debounceGet, debouncePost, debouncePatch, debounceDelete: (url, data?, token, delay)
    data = dataOrHeaders;
    const token = tokenOrDelay as string;
    finalDelay = delay ?? DEFAULT_DELAY;
    headers = buildHeaders(token);
  }

  // Xử lý cho Debounce Get (với token) và các phương thức khác
  if (method === "get" && typeof tokenOrDelay === "string") {
    headers = buildHeaders(tokenOrDelay as string);
    finalDelay = delay ?? DEFAULT_DELAY;
    data = undefined;
  }

  // Xử lý DebounceGets
  if (method === "get" && typeof tokenOrDelay === "number") {
    headers = dataOrHeaders as Record<string, string>;
    finalDelay = tokenOrDelay as number;
    data = undefined;
  }

  clearPrevious(url);

  return new Promise((resolve, reject) => {
    // Ép kiểu kết quả của setTimeout thành number
    debounceTimers[url] = setTimeout(async () => {
      const controller = new AbortController();
      abortControllers[url] = controller;

      try {
        let response: AxiosResponse;
        const config: AxiosRequestConfig = {
          signal: controller.signal,
          headers: headers,
        };

        switch (method) {
          case "get":
            response = await api.get(url, config);
            break;
          case "post":
            response = await api.post(url, data, config);
            break;
          case "patch":
            response = await api.patch(url, data, config);
            break;
          case "delete":
            response = await api.delete(url, config);
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }

        resolve(response.data);
      } catch (error) {
        console.error(`Error ${method.toUpperCase()} data`, error);
        reject(error);
      } finally {
        delete debounceTimers[url];
        delete abortControllers[url];
      }
    }, finalDelay) as number;
  });
};

// 📌 Debounce GET with token
export const debounceGet = <T = any>(
  url: string,
  token: string,
  delay: number = DEFAULT_DELAY
): ApiResponse<T> =>
  createDebouncedRequest<T>("get", url, undefined, token, delay);

// 📌 Debounce GET with custom headers
export const debounceGets = <T = any>(
  url: string,
  headers: Record<string, string>,
  delay: number = DEFAULT_DELAY
): ApiResponse<T> => createDebouncedRequest<T>("get", url, headers, delay);

// 📌 Debounce POST
export const debouncePost = <T = any>(
  url: string,
  data: any,
  token?: string,
  delay: number = DEFAULT_DELAY
): ApiResponse<T> =>
  createDebouncedRequest<T>("post", url, data, token || "", delay);

// 📌 Debounce PATCH
export const debouncePatch = <T = any>(
  url: string,
  data: any,
  token: string,
  delay: number = DEFAULT_DELAY
): ApiResponse<T> =>
  createDebouncedRequest<T>("patch", url, data, token, delay);

// 📌 Debounce DELETE
export const debounceDelete = <T = any>(
  url: string,
  token: string,
  delay: number = DEFAULT_DELAY
): ApiResponse<T> =>
  createDebouncedRequest<T>("delete", url, undefined, token, delay);

// 6. Hàm xử lý lỗi
const error = (e: AxiosError | any): void => {
  const data = e?.response?.data;
  const errorMessage =
    data?.detail ||
    data?.details ||
    data?.error ||
    data?.errors ||
    "Có lỗi xảy ra!";
  message.error(errorMessage);
};

// 7. Map Breadcrumb
const mapBreadcrumb: Record<string, string> = {
  extends: "Tiện ích",
  config: "Cài đặt",
  user: "Cá nhân hóa",
  app: "Trang chủ",
  companys: "Công ty",
  roles: "Phòng ban & chức vụ",
  accounts: "Quản lý tài khoản",
  chat: "Trò chuyện",
  contacts: "Danh bạ",
  settings: "Cài đặt",
  all: "Tất cả",
  qrbanks: "QRBanks",
  approve: "Phê duyệt",
  baoung: "Báo ứng",
  giuluong: "Giữ lương",
  chitieu: "Chi tiêu",
  operators: "Nhân lực",
  add: "Thêm mới",
  work_report: "Báo cáo đi làm",
  group: "Nhóm",
  department: "Bộ phận",
  chatted: "Đã nhắn tin",
  partners: "Công ty cung ứng",
  customers: "Khách hàng",
  permission: "Phân quyền",
  dashboard: "Tổng quan",
};

// 8. Hàm chuyển số thành chữ tiếng Việt
function docBaSo(num: number): string {
  const chuSo = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  let tram = Math.floor(num / 100);
  let chuc = Math.floor((num % 100) / 10);
  let donvi = num % 10;
  let result = "";

  if (tram !== 0) {
    result += chuSo[tram] + " trăm";
    if (chuc === 0 && donvi !== 0) result += " linh";
  }

  if (chuc !== 0 && chuc !== 1) {
    result += " " + chuSo[chuc] + " mươi";
    if (donvi === 1) result += " mốt";
    else if (donvi === 5) result += " lăm";
    else if (donvi !== 0) result += " " + chuSo[donvi];
  } else if (chuc === 1) {
    result += " mười";
    if (donvi === 1) result += " một";
    else if (donvi === 5) result += " lăm";
    else if (donvi !== 0) result += " " + chuSo[donvi];
  } else if (donvi !== 0 || (chuc === 0 && tram === 0)) {
    // Xử lý trường hợp chỉ còn đơn vị
    if (result) result += " " + chuSo[donvi];
    else result += chuSo[donvi];
  }

  return result.trim();
}

function numberToVietnameseText(number: number | string): string {
  let num: number;
  if (typeof number === "string") {
    num = parseInt(number);
  } else {
    num = number;
  }

  if (isNaN(num)) return "Không hợp lệ";
  if (num === 0) return "Không đồng";

  const hangDonVi = [
    "",
    "nghìn",
    "triệu",
    "tỷ",
    "nghìn tỷ",
    "triệu tỷ",
    "tỷ tỷ",
  ];

  let result = "";
  let i = 0;
  let tempNumber = num;

  while (tempNumber > 0 && i < hangDonVi.length) {
    let baSo = tempNumber % 1000;
    tempNumber = Math.floor(tempNumber / 1000);

    if (baSo !== 0) {
      let doc = docBaSo(baSo);
      if (i > 0 && tempNumber > 0) {
        result = doc + " " + hangDonVi[i] + " " + result;
      } else if (i > 0) {
        result = doc + " " + hangDonVi[i] + " " + result;
      } else {
        result = doc + " " + result;
      }
    }
    i++;
  }

  // Chuẩn hóa: viết hoa chữ cái đầu và thêm "đồng"
  result = result.trim();
  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1) + " đồng";
  } else {
    result = "Không đồng";
  }

  return result;
}

// 9. Hàm loại bỏ dấu tiếng Việt
const removeVietnameseTones = (str: string): string => {
  return str
    .normalize("NFD") // tách dấu ra
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
};

const MAX_FILE_SIZE_BYTES = 200 * 1024; // 200 KB
const MAX_INITIAL_DIMENSION = 1200; // Kích thước tối đa ban đầu
const NEXT_SCALE_REDUCTION = 0.9; // Giảm 10% kích thước vật lý mỗi lần lặp
const drawScaledImage = (
  img: HTMLImageElement,
  scale: number,
  canvas: HTMLCanvasElement
): void => {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context failed.");

  const newWidth = img.width * scale;
  const newHeight = img.height * scale;

  // Đảm bảo kích thước không nhỏ hơn 1px
  canvas.width = Math.max(1, newWidth);
  canvas.height = Math.max(1, newHeight);

  ctx.drawImage(img, 0, 0, newWidth, newHeight);
};
// Hàm nén ảnh client-side (output là PNG, giảm kích thước vật lý liên tục)
export const compressImage = (file: File): Promise<File | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image() as HTMLImageElement;
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let currentScale = 1.0;
        if (
          img.width > MAX_INITIAL_DIMENSION ||
          img.height > MAX_INITIAL_DIMENSION
        ) {
          currentScale = Math.min(
            MAX_INITIAL_DIMENSION / img.width,
            MAX_INITIAL_DIMENSION / img.height
          );
        }
        drawScaledImage(img, currentScale, canvas);
        const recursiveCompression = (scale: number): void => {
          canvas.toBlob((blob) => {
            if (blob) {
              if (blob.size <= MAX_FILE_SIZE_BYTES) {
                const compressedFile = new File(
                  [blob],
                  file.name.replace(/\.[^/.]+$/, "") + ".png",
                  {
                    type: "image/png",
                    lastModified: Date.now(),
                  }
                );
                resolve(compressedFile);
              } else {
                const newScale = scale * NEXT_SCALE_REDUCTION;
                if (img.width * newScale < 10 || img.height * newScale < 10) {
                  reject(
                    new Error(
                      `Kích thước ảnh PNG không thể giảm xuống dưới ${
                        MAX_FILE_SIZE_BYTES / 1024
                      } KB ngay cả ở kích thước rất nhỏ.`
                    )
                  );
                  return;
                }
                try {
                  drawScaledImage(img, newScale, canvas);
                  // Đệ quy
                  recursiveCompression(newScale);
                } catch (e) {
                  reject(e as Error);
                }
              }
            } else {
              reject(new Error("Lỗi nén ảnh thành Blob."));
            }
          }, "image/png");
        };

        recursiveCompression(currentScale);
      };
      img.onerror = () => reject(new Error("Lỗi tải ảnh vào bộ nhớ."));
    };
    reader.onerror = () => reject(new Error("Lỗi đọc file."));
  });
};

function timeSinceOrder(createdAt: string, language = "en") {
  const orderDate = new Date(createdAt || "");
  const now = new Date();
  const diffMs = now.getTime() - orderDate.getTime();
  const timeUnits = [
    { unit: "minute", value: 60 },
    { unit: "hour", value: 24 },
    { unit: "day", value: 30 },
    { unit: "month", value: 12 },
    { unit: "year", value: Infinity },
  ];
  let diff = Math.floor(diffMs / 60000); // Chuyển đổi sang phút
  if (diff < 1) return language === "en" ? "now" : "bây giờ";
  for (const { unit, value } of timeUnits) {
    if (diff < value) {
      return language === "en"
        ? `${diff} ${unit}${diff !== 1 ? "s" : ""} ago`
        : `${diff} ${
            unit === "minute"
              ? "phút"
              : unit === "hour"
              ? "giờ"
              : unit === "day"
              ? "ngày"
              : unit === "month"
              ? "tháng"
              : "năm"
          } trước`;
    }
    diff = Math.floor(diff / value);
  }
}
function timeUntil(targetDateTime: string, unit: string = "auto") {
  const now = new Date();
  const target = new Date(targetDateTime);
  const diffMs = target.getTime() - now.getTime();
  if (diffMs <= 0) {
    return timeSinceOrder(targetDateTime, "vn");
  }
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  switch (unit.toLowerCase()) {
    case "days":
      return `${diffDays} ngày`;
    case "hours":
      return `${diffHours} giờ`;
    case "minutes":
      return `${diffMinutes} phút`;
    case "seconds":
      return `${diffSeconds} giây`;
    case "auto":
    default:
      if (diffDays > 0) {
        return `${diffDays} days left`;
      } else if (diffHours > 0) {
        return `${diffHours} hours left`;
      } else {
        return `${diffMinutes} minutes left`;
      }
  }
}
interface HRProAPIModule {
  removeVietnameseTones: (str: string) => string;
  numberToVietnameseText: (number: number | string) => string;
  mapBreadcrumb: Record<string, string>;
  error: (e: AxiosError | any) => void;
  get: typeof debounceGet;
  gets: typeof debounceGets;
  post: typeof debouncePost;
  patch: typeof debouncePatch;
  delete: typeof debounceDelete;
  key: string;
  timeUntil: (target: string, unit: string) => string | undefined;
  compressImage: (file: File) => Promise<File | null>;
}

const Api: HRProAPIModule = {
  removeVietnameseTones,
  numberToVietnameseText,
  mapBreadcrumb,
  error,
  get: debounceGet,
  gets: debounceGets,
  post: debouncePost,
  patch: debouncePatch,
  delete: debounceDelete,
  key,
  timeUntil,
  compressImage,
};

export default Api;
