import React from "react";
import { FaUsersLine } from "react-icons/fa6";
import { RiPagesFill } from "react-icons/ri";
import { TbBuildingCog } from "react-icons/tb";
import { Link } from "react-router-dom";

const Admin_index = () => {
  return (
    <>
      <Link
        to="/mobile/canhan/congty"
        className="flex text-[12px] gap-2 items-center bg-white shadow p-2 select-none"
      >
        <div className="flex min-w-10 w-10 h-10 items-center bg-[#2e3236] justify-center">
          <TbBuildingCog size={20} color="#fff" />
        </div>
        <div className="flex flex-col w-full relative">
          <div className="flex justify-between">
            <div className="text-[14px] font-medium">Danh sách công ty</div>
          </div>
          <div className="text-[12px]">Thêm sửa xóa danh sách công ty</div>
        </div>
      </Link>
      <Link
        to="/mobile/canhan/congtv"
        className="flex text-[12px] gap-2 items-center bg-white shadow p-2 select-none"
      >
        <div className="flex min-w-10 w-10 h-10 items-center bg-[#2e3236] justify-center">
          <FaUsersLine size={20} color="#fff" />
        </div>
        <div className="flex flex-col w-full relative">
          <div className="flex justify-between">
            <div className="text-[14px] font-medium">Cộng tác viên</div>
          </div>
          <div className="text-[12px]">Thêm sửa xóa cộng tác viên</div>
        </div>
      </Link>
      {/* <Link
        to="/mobile/canhan/tintd"
        className="flex text-[12px] gap-2 items-center bg-white shadow p-2 select-none"
      >
        <div className="flex min-w-10 w-10 h-10 items-center bg-[#2e3236] justify-center">
          <RiPagesFill size={20} color="#fff" />
        </div>
        <div className="flex flex-col w-full relative">
          <div className="flex justify-between">
            <div className="text-[14px] font-medium">Tin tuyển dụng</div>
          </div>
          <div className="text-[12px]">Đăng bài tuyển dụng cho một công ty</div>
        </div>
      </Link> */}
    </>
  );
};

export default Admin_index;
