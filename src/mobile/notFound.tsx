// src/pages/NotFoundPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Button, Result } from "antd"; // Tận dụng Ant Design
import { MdSignalWifiStatusbarNotConnected } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center flex-1 justify-center">
      <div className="flex flex-col p-18 text-center items-center text-[15px] text-[#3e3e49]">
        <MdSignalWifiStatusbarNotConnected size={48} className="mb-4" />
        Nội dung bạn tìm kiếm đã bị xóa hoặc không tồn tại
        <div className="mb-1" />
        Vui lòng quay lại sau và thử lại sau.
      </div>
      <Link to="/mobile">
        <Button type="primary" icon={<FaArrowLeft />}>
          Quay về Trang chủ
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
