import { Button } from "antd";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { RiMapPin5Line } from "react-icons/ri";

const Canhan_index = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex bg-white shadow p-2 gap-2">
        <div className="avatar w-20 h-20 bg-[#999]"></div>
        <div className="flex flex-col">
          <div className="flex">Họ và tên</div>
          <div className="text-[12px] text-[#444]">Chưa đi làm</div>
          <div className="text-[12px] text-[#444]">@hovaten</div>
        </div>
      </div>
      <div className="flex text-[12px] flex-col bg-white shadow p-1">
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
            <div className="px-1 py-0.5 border rounded-md border-[#c4c4c4] text-[#555]">
              ASSY - Đứng máy
            </div>
          </div>
        </div>
        <div className="flex flex-col border-t border-[#eee] p-1">
          <div className="flex justify-between">
            <div className="time text-[#07f]">Arcadyan</div>
            <div className="time">01/2025 - 07/2025</div>
          </div>
          <div className="flex mt-1 text-[11px] gap-1 flex-wrap">
            <div className="px-1 py-0.5 border rounded-md border-[#c4c4c4] text-[#555]">
              SMT - Test hàng
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canhan_index;
