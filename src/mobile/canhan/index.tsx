import { Button, Modal } from "antd";
import React, { useState } from "react";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";
import { RiMapPin5Line } from "react-icons/ri";

const Canhan_index = () => {
  const [userSetting, setUserSetting] = useState({
    timviec: false,
  });
  return (
    <div className="flex flex-col gap-1">
      <div className="flex bg-white shadow p-2 gap-2">
        <div className="avatar w-20 h-20 bg-[#235fa3]"></div>
        <div className="flex flex-col">
          <div className="flex text-[#235fa3] text-[18px] font-medium">
            Họ và tên
          </div>
          <div className="text-[10px] text-[#444] font-medium">@hovaten</div>
          <div className="text-[10px] text-[#444] mb-0.5">
            Lao động phổ thông
          </div>
          <div className="flex">
            <div className="text-[10px] bg-[#235fa3] text-white px-2 py-0.5 rounded">
              Đang tìm việc
            </div>
          </div>
        </div>
      </div>
      <div className="flex text-[12px] gap-2 items-center bg-white shadow p-2 select-none">
        <div className="flex min-w-10 w-10 h-10 items-center bg-[#2e3236] justify-center">
          <MdWorkHistory size={20} color="#fff" />
        </div>
        <div className="flex flex-col w-full relative">
          <div className="flex justify-between">
            <div className="text-[14px] font-medium">Người đi tìm việc</div>
          </div>
          <div className="text-[12px]">
            Tài khoản của bạn đang là người tìm việc
          </div>
        </div>
      </div>
      <div className="flex text-[12px] flex-col bg-white shadow p-2 select-none">
        {userSetting.timviec === true ? (
          <div
            className="flex text-[#235fa3] gap-2"
            onClick={() =>
              Modal.confirm({
                autoFocusButton: null,
                title: "Cảnh báo!",
                content: "Nhà tuyển dụng sẽ không tìm thấy hồ sơ của bạn",
                cancelText: "Đóng",
                okText: "Xác nhận",
                onOk: () => setUserSetting((o) => ({ ...o, timviec: false })),
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
            onClick={() => setUserSetting((o) => ({ ...o, timviec: true }))}
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
      <div className="flex text-[12px] flex-col bg-white shadow p-1 select-none">
        <div className="p-1 flex justify-between">
          <div className=" font-medium flex gap-1 items-center">
            <RiMapPin5Line />
            Kinh nghiệm làm việc
          </div>
          <button className="flex items-center justify-center border w-6 h-6 rounded border-[#0003] text-[#0005]">
            <FaPlus size={10} />
          </button>
        </div>
        <div className="flex flex-col border-t border-[#eee] p-1">
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
        </div>
      </div>
    </div>
  );
};

export default Canhan_index;
