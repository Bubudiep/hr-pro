import React, { type ReactNode, useState } from "react";
// Đảm bảo bạn đã cài đặt và cấu hình Ant Design và Tailwind CSS trong dự án
import { Modal, Typography, Space, Divider } from "antd";
import { FaLocationDot } from "react-icons/fa6";

const { Title, Text } = Typography;

interface CompanyCardProps {
  children: ReactNode;
  companyData: {
    fullname: string;
    name: string;
    address: string;
    description: string;
    logo: string;
  };
}
const CompanyCard = ({ children, companyData }: CompanyCardProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div onClick={showModal}>{children}</div>
      <Modal
        title={<Title level={4}>{companyData?.name}</Title>}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex flex-col -my-2!">
          <div className="flex gap-4">
            <div className="w-12 h-12">
              <img src={companyData?.logo} className="w-full" />
            </div>
            <div className="flex flex-col">
              <div className="flex font-medium text-[16px]">
                {companyData?.fullname}
              </div>
              <div className="flex gap-1 items-center mt-auto">
                <FaLocationDot />
                {companyData?.address}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CompanyCard;
