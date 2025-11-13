import dayjs from "dayjs";
import React from "react";
import Api from "../../components/api";
import { FaUser } from "react-icons/fa";
import { Tooltip } from "antd";
import Dangnhap from "../../components/auth/Dangnhap";

const User_info = ({ user_id, time }: { user_id: number; time: string }) => {
  const post = {};
  return (
    <>
      {post?.user?.avatar ? (
        <div className="min-w-10 w-10 h-10 border border-[#0003] mr-3 overflow-hidden">
          <img
            className="w-full h-full"
            src={post?.user?.avatar || "https://placehold.co/600x600"}
          />
        </div>
      ) : (
        <Tooltip
          color="white"
          title={
            <div className="flex gap-1 text-[black]">
              Yêu cầu <Dangnhap className="text-[#07f]">đăng nhập</Dangnhap> để
              xem!
            </div>
          }
        >
          <div className="min-w-10 w-10 h-10 bg-[#004166] mr-3 flex border items-center justify-center overflow-hidden">
            <FaUser className="text-[#d6d6d6]" />
          </div>
        </Tooltip>
      )}
      <div className="flex flex-col">
        <div className="flex gap-1 text-[12px] items-baseline">
          <p className="font-semibold">{post?.user?.name || "Người dùng"}</p>
        </div>
        <span className="text-gray-500 flex items-center mt-0.5 gap-1 text-[10px] leading-[1.2]">
          {post?.company && `${post?.company}, `}
          {post?.location || "-"}
        </span>
        <span className="text-gray-500 text-[9px] leading-[1.3]">
          {Api.timeUntil(time)}
        </span>
      </div>
    </>
  );
};

export default User_info;
