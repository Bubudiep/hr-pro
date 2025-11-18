import { Modal } from "antd";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { FaCircleXmark, FaUsersLine } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";
import { RiMapPin5Line, RiPagesFill } from "react-icons/ri";
import ChuaDangnhap from "../../components/auth/ChuaDangnhap";
import { useAuth } from "../../context/authContext";
import { TbBuildingCog } from "react-icons/tb";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Admin_index from "./admin";

const Canhan_index = () => {
  const nav = useNavigate();
  const { user, updateProfile } = useAuth();
  return (
    <>
      {user?.id ? (
        <div className="flex flex-col gap-1 relative">
          <Outlet />
          <div className="flex bg-white shadow p-2 gap-2">
            <div className="avatar w-20 h-20 bg-[#235fa3]"></div>
            <div className="flex flex-col">
              <div className="flex text-[#235fa3] text-[18px] font-medium">
                {user?.profile?.name || "No name"}
              </div>
              <div className="text-[10px] text-[#444] font-medium">
                @{user?.profile?.tag || "no.name"}
              </div>
              <div className="text-[10px] text-[#444] mb-0.5">
                {user?.profile?.level_name}
              </div>
              <div className="flex">
                <div className="text-[10px] bg-[#235fa3] text-white px-2 py-0.5 rounded">
                  Đang tìm việc
                </div>
              </div>
            </div>
          </div>
          {user?.profile?.level === "admin" && <Admin_index />}
          {user?.profile?.level === "normal" && (
            <>
              <div className="flex text-[12px] gap-2 items-center bg-white shadow p-2 select-none">
                <div className="flex min-w-10 w-10 h-10 items-center bg-[#2e3236] justify-center">
                  <MdWorkHistory size={20} color="#fff" />
                </div>
                <div className="flex flex-col w-full relative">
                  <div className="flex justify-between">
                    <div className="text-[14px] font-medium">
                      Người đi tìm việc
                    </div>
                  </div>
                  <div className="text-[12px]">
                    Tài khoản của bạn đang là người tìm việc
                  </div>
                </div>
              </div>
              <div className="flex text-[12px] flex-col bg-white shadow p-2 select-none">
                {user?.profile?.timviec === true ? (
                  <div
                    className="flex text-[#235fa3] gap-2"
                    onClick={() =>
                      Modal.confirm({
                        autoFocusButton: null,
                        title: "Cảnh báo!",
                        content:
                          "Nhà tuyển dụng sẽ không còn tìm thấy hồ sơ của bạn nữa!",
                        cancelText: "Đóng",
                        okText: "Xác nhận",
                        onOk: () => updateProfile({ timviec: false }),
                      })
                    }
                  >
                    <div className="flex min-w-10 w-10 items-center bg-[#235fa3] justify-center">
                      <FaCheckCircle size={20} color="#fff" />
                    </div>
                    <div className="flex flex-col w-full relative">
                      <div className="flex justify-between">
                        <div className="text-[14px] font-medium">
                          Tìm việc - đang bật
                        </div>
                      </div>
                      <div className="text-[12px]">
                        Nhà tuyển dụng có thể thấy hồ sơ của bạn
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex text-[#2e3236] gap-2"
                    onClick={() => updateProfile({ timviec: true })}
                  >
                    <div className="flex min-w-10 w-10 items-center bg-[#2e3236] justify-center">
                      <FaCircleXmark size={20} color="#fff" />
                    </div>
                    <div className="flex flex-col w-full relative">
                      <div className="flex justify-between">
                        <div className="text-[14px] font-medium">
                          Tìm việc - đang tắt
                        </div>
                      </div>
                      <div className="text-[12px]">Hồ sơ của bạn đang ẩn</div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex text-[12px] flex-col bg-white shadow select-none">
                <div className="p-2 flex justify-between border-b border-[#eee]">
                  <div className=" font-medium flex gap-1 items-center">
                    <RiMapPin5Line />
                    Kinh nghiệm làm việc
                  </div>
                  <button
                    className="flex items-center justify-center border w-6 h-6 
                    rounded border-[#0003] text-[#0005] active:text-[#07f]
                    active:border-[#07f] active:shadow active:shadow-[#0077ff6b]"
                  >
                    <FaPlus size={10} />
                  </button>
                </div>
                <div className="flex flex-col px-1">
                  <div className="flex flex-col border-[#eee] p-1">
                    <div className="py-2 text-[#999]">Chưa đi làm!</div>
                  </div>
                  {/* <div className="flex flex-col border-[#eee] p-1">
                    <div className="flex justify-between">
                      <div className="time text-[#07f]">Compal</div>
                      <div className="time">01/2025 - 07/2025</div>
                    </div>
                    <div className="flex mt-1 text-[11px] gap-1 flex-wrap">
                      <div className="px-1.5 py-0.5 border rounded-md border-[#c4c4c4] text-[#555]">
                        ASSY - Đứng máy
                      </div>
                      <div className="px-1.5 py-0.5 border rounded-md border-[#c4c4c4] text-[#555]">
                        PACKING - Đóng hàng
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col border-t border-[#eee] p-1">
                    <div className="flex justify-between">
                      <div className="time text-[#07f]">Arcadyan</div>
                      <div className="time">02/2023 - 01/2025</div>
                    </div>
                    <div className="flex mt-1 text-[11px] gap-1 flex-wrap">
                      <div className="px-1.5 py-0.5 border rounded-md border-[#c4c4c4] text-[#555]">
                        SMT - Test hàng
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </>
          )}
          <div
            className="flex w-full justify-center p-2 mt-6 items-center bg-white shadow text-[red]"
            onClick={() => {
              Modal.confirm({
                title: "Cảnh báo",
                content: "Xác nhận đăng xuất",
                onOk: () => {
                  localStorage.removeItem("access_token");
                  location.reload();
                },
                okText: "Xác nhận",
                cancelText: "Đóng",
              });
            }}
          >
            Đăng xuất
          </div>
        </div>
      ) : (
        <ChuaDangnhap />
      )}
    </>
  );
};

export default Canhan_index;
