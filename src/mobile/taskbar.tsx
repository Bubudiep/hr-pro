// src/components/BottomTaskbar.tsx
import { type Dispatch, type SetStateAction } from "react";
import { UserOutlined } from "@ant-design/icons";
import { LuCalendarCheck2, LuCalendarRange } from "react-icons/lu";
import { BsUiChecks } from "react-icons/bs";
import { DiCodeigniter } from "react-icons/di";
import { useAuth } from "../context/authContext";

const BottomTaskbar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (e: string) => void;
}) => {
  const { config } = useAuth();
  return (
    <nav
      className={`taskbar select-none ${config?.taskbar ? "" : "-bottom-20!"}`}
    >
      <div
        className="flex px-2 h-16 w-[calc(100%-16px)] mb-2 rounded-[18px] justify-around 
        bg-white shadow border border-[#0001]"
      >
        <div
          className={
            `item ` +
            (activeTab === "cong"
              ? "text-blue-600"
              : "text-gray-500 hover:text-gray-800")
          }
          onClick={() => setActiveTab("cong")}
        >
          <LuCalendarCheck2 className="text-[20px]" />
          <span className="text-[11px]">Công</span>
        </div>
        <div
          className={
            `item ` +
            (activeTab === "luong"
              ? "text-blue-600"
              : "text-gray-500 hover:text-gray-800")
          }
          onClick={() => setActiveTab("luong")}
        >
          <BsUiChecks className="text-[20px]" />
          <span className="text-[11px]">Lương</span>
        </div>
        <div className="w-16 h-14 relative flex justify-center">
          <div
            className={`main ${
              activeTab === "news"
                ? "text-[#008cff] shadow-[#c6edff]"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("news")}
          >
            <DiCodeigniter className="text-[28px]" />
          </div>
        </div>
        <div
          className={
            `item ` +
            (activeTab === "lichtuyen"
              ? "text-blue-600"
              : "text-gray-500 hover:text-gray-800")
          }
          onClick={() => setActiveTab("lichtuyen")}
        >
          <LuCalendarRange className="text-[20px]" />
          <span className="text-[11px]">Lịch tuyển</span>
        </div>
        <div
          className={
            `item ` +
            (activeTab === "canhan"
              ? "text-blue-600"
              : "text-gray-500 hover:text-gray-800")
          }
          onClick={() => setActiveTab("canhan")}
        >
          <UserOutlined className="text-[20px]" />
          <span className="text-[11px]">Cá nhân</span>
        </div>
      </div>
    </nav>
  );
};

export default BottomTaskbar;
