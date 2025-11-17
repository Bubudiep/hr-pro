import Dexie, { type Table } from "dexie";
import Api from "../components/api";
export interface Baiviet {
  id?: number;
  user: number;
  username: string;
  noidung: string;
}
export interface KhuCongNghiep {
  id?: number;
  name: string;
  fullname: string;
}
export interface HrProDb extends Dexie {
  Baiviet: Dexie.Table<Baiviet, number>;
  KhuCongNghiep: Dexie.Table<KhuCongNghiep, number>;
  CongTy: Dexie.Table<any, number>;
  TinTag: Dexie.Table<any, number>;
  TuyenDung: Dexie.Table<any, number>;
}
type StoreName = keyof HrProDb;
export const db = new Dexie("hr_pro_db") as HrProDb;
db.version(1).stores({
  Baiviet:
    "++id,user,username,noidung,location_name,long_location,lat_location, updated_at, created_at",
  KhuCongNghiep: "++id,name,fullname,mota, updated_at, created_at",
  CongTy:
    "++id,name,fullname,address,hotline,email,is_banned,khucongnhiep,is_verified, updated_at, created_at",
  TinTag: "++id,name,content, updated_at, created_at",
});
db.version(2).stores({
  TuyenDung:
    "++id,code,companies,chinhthuc,bophan,vitri,thuong,min_old,max_old,ngayketthuc,soluong,khucongnhiep,user,tuyengap,tags, updated_at, created_at",
});
export async function syncInit(access_token: string) {
  const max_ips = await getMaxUpdatedAt("KhuCongNghiep");
  const max_tag = await getMaxUpdatedAt("TinTag");
  const max_comp = await getMaxUpdatedAt("CongTy");
  const max_tin = await getMaxUpdatedAt("TuyenDung");
  const apiCalls = [
    Api.get(
      `/ips/?page_size=99&max_id=${max_ips?.updated_at || 0}`,
      access_token
    ),
    Api.get(
      `/tag/?page_size=99&max_id=${max_tag?.updated_at || 0}`,
      access_token
    ),
    Api.get(
      `/comp/?page_size=99&max_id=${max_comp?.updated_at || 0}`,
      access_token
    ),
    Api.get(
      `/tin/?page_size=16&max_id=${max_tin?.updated_at || 0}`,
      access_token
    ),
  ];
  const results = await Promise.all(apiCalls);
  const [ipsResult, tagResult, compResult, tinResult] = results;
  putMultiple("KhuCongNghiep", ipsResult?.results);
  putMultiple("CongTy", compResult?.results);
  putMultiple("TinTag", tagResult?.results);
  putMultiple("TuyenDung", tinResult?.results);
  return true;
}
export async function bulkDelete(storeName: StoreName, keys: any[]) {
  if (!keys || keys.length === 0) {
    console.warn(`bulkDelete: Mảng keys trống. Không cần thực hiện thao tác.`);
    return;
  }
  try {
    const store = (db as any)[storeName] as Table<any, any>; // Ép kiểu

    if (!store || !("bulkDelete" in store)) {
      throw new Error(`Store không hợp lệ hoặc không phải là Dexie Table.`);
    }

    // Chạy trong transaction để đảm bảo tính toàn vẹn và hiệu suất
    await db.transaction("rw", [store], async () => {
      await store.bulkDelete(keys);
    });

    console.log(
      `Đã xóa thành công ${keys.length} bản ghi khỏi store: ${storeName}`
    );
  } catch (error) {
    console.error(`Lỗi khi bulkDelete cho ${storeName}`, error);
    throw error;
  }
}
export async function putMultiple(storeName: StoreName, dataArray: any[]) {
  try {
    const store = db[storeName] as Table<any, any>;
    if (!store || !("bulkPut" in store)) {
      throw new Error(`Store không hợp lệ hoặc không phải là Dexie Table.`);
    }
    const ids = await db.transaction("rw", [store], async () => {
      const keys = await store.bulkPut(dataArray, { allKeys: true });
      return keys;
    });
    return ids;
  } catch (error) {
    console.error(`Lỗi khi putMultiple`, error);
    throw error;
  }
}
export async function getData(storeName: StoreName) {
  try {
    const store = db[storeName] as Table<any, any>;
    if (!store || !("toArray" in store)) {
      throw new Error(`Store không hợp lệ hoặc không phải là Dexie Table.`);
    }
    const data = await store.toArray();
    return data;
  } catch (error) {
    throw error;
  }
}
interface TimestampedRecord {
  id: number;
  updated_at: string;
}
export async function getMaxUpdatedAt(
  storeName: StoreName
): Promise<{ id: number; updated_at: string } | undefined> {
  try {
    const store = db[storeName] as Table<TimestampedRecord, number>;
    const latestRecord = await store.orderBy("updated_at").reverse().first();
    if (latestRecord && latestRecord.updated_at) {
      return latestRecord;
    }
    return undefined; // Trả về undefined nếu không có bản ghi nào
  } catch (error) {
    console.error(`Lỗi khi lấy max updated_at từ Store '${storeName}':`, error);
    throw error;
  }
}
export default db;
