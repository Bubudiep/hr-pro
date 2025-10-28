// src/components/BottomTaskbar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { AiFillAliwangwang } from "react-icons/ai";
import { LuCalendarCheck2, LuCalendarRange } from "react-icons/lu";
import { BsUiChecks } from "react-icons/bs";
import { DiCodeigniter } from "react-icons/di";

// Hàm helper để xác định class cho NavLink (link nào đang active)
const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex flex-col w-auto h-14 duration-300 mt-1 gap-0.5 items-center justify-center rounded-lg transition-all ` +
  (isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-800");
const BottomTaskbar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around items-center z-50 md:hidden">
      <div
        className="flex px-2 h-16 w-[calc(100%-16px)] mb-2 rounded-[18px] justify-around 
        bg-white shadow border border-[#0001]"
      >
        <NavLink to="/mobile/cong" className={getNavLinkClass} end>
          <LuCalendarCheck2 className="text-[20px]" />
          <span className="text-[11px]">Công</span>
        </NavLink>
        <NavLink to="/mobile/luong" className={getNavLinkClass}>
          <BsUiChecks className="text-[20px]" />
          <span className="text-[11px]">Lương</span>
        </NavLink>
        <div className="w-14 h-14 relative flex justify-center">
          <NavLink
            to="/mobile/news"
            className={({ isActive }: { isActive: boolean }) =>
              `flex absolute bg-[white] items-center 
              justify-center w-15 h-15 -top-5 
              rounded-full shadow-xl z-1 duration-300 transition-all ${
                isActive
                  ? "text-[#008cff] shadow-[#c6edff]"
                  : "text-gray-500 hover:text-gray-800"
              }`
            }
          >
            <DiCodeigniter className="text-[28px]" />
          </NavLink>
        </div>
        <NavLink to="/mobile/lichtuyen" className={getNavLinkClass}>
          <LuCalendarRange className="text-[20px]" />
          <span className="text-[11px]">Lịch tuyển</span>
        </NavLink>
        <NavLink to="/mobile/profile" className={getNavLinkClass}>
          <UserOutlined className="text-[20px]" />
          <span className="text-[11px]">Cá nhân</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomTaskbar;
