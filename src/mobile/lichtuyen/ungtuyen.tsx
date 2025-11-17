import { message, Modal } from "antd";
import React, { useState, type ReactNode } from "react";
import { useAuth } from "../../context/authContext";
import { FaLocationDot } from "react-icons/fa6";
import { HiBellAlert } from "react-icons/hi2";
interface UntuyenType {
  children: ReactNode;
  className: string;
  tin: {
    id: number;
    companies: number;
    thuong: number;
    dieukien_thuong: string;
    mucluong: string;
    min_old: number;
    max_old: number;
    bophan: string;
    vitri: string;
    chinhthuc: boolean;
  };
}
const Ungtuyen_form = ({ children, className, tin }: UntuyenType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { init, user } = useAuth();
  const comp = init?.companies?.find((c) => c?.id === tin?.companies);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSubmitApplication = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsModalOpen(false); // Đóng modal sau khi hoàn tất
      message.success("Đã gửi đơn ứng tuyển thành công!"); // Thông báo thành công từ antd
    }, 2000); // Giả lập 2 giây gửi
  };
  console.log(tin);
  return (
    <>
      <div className={className} onClick={handleOpenModal}>
        {children}
      </div>
      <Modal
        title="Đơn ứng tuyển"
        open={isModalOpen}
        onOk={handleSubmitApplication}
        onCancel={handleCloseModal}
        confirmLoading={isLoading}
        okText={<div className="font-medium text-[#07f]">Ứng tuyển</div>}
        cancelText="Hủy"
        width={600}
      >
        <div className="-my-2">
          <div className="h-full">
            <div className="flex flex-col mb-3 gap-2">
              <div className="company_card flex gap-2 p-2 rounded-lg shadow">
                <div className="flex avatar w-12 min-w-12">
                  <img src={comp?.logo} className="object-cover" />
                </div>
                <div className="flex flex-col">
                  <div className="flex font-medium text-[15px]">
                    {comp?.name}
                  </div>
                  <div className="flex text-[#999] items-center gap-1">
                    <FaLocationDot />
                    {comp?.address}
                  </div>
                </div>
              </div>
              <div className="flex flex-col leading-4.5">
                <div className="flex justify-between">
                  Vị trí:
                  <b className="font-medium text-[#666]">{tin?.vitri}</b>
                </div>
                <div className="flex justify-between">
                  Bộ phận:
                  <b className="font-medium text-[#666]">{tin?.bophan}</b>
                </div>
                <div className="flex justify-between">
                  Loại hình:
                  <b className="font-medium text-[#666]">
                    {tin?.chinhthuc ? "Chính thức" : "Thời vụ"}
                  </b>
                </div>
                <div className="flex font-medium justify-between mt-1">
                  Thưởng nóng:
                  <b className="text-[#fd5d00] text-[15px]">
                    {tin?.thuong?.toLocaleString()}VNĐ
                  </b>
                </div>
                <div className="flex font-medium mt-1 items-center gap-1 text-[#1a346d]">
                  <HiBellAlert />
                  Điều kiện thưởng:
                </div>
                <pre className="p-2 bg-[#e7ebf5] rounded-md mt-0.5">
                  {tin?.dieukien_thuong}
                </pre>
              </div>
            </div>
            <div className="flex border-b border-[#c9c9c9] mb-2" />
            <div className="mb-1">
              <label className="block text-gray-700 text-[13px] font-medium">
                Họ và Tên:
              </label>
              <input
                value={user?.profile?.name}
                type="text"
                placeholder="Nguyễn Văn A"
                className="w-full p-1 px-1.5 border border-gray-300 rounded focus:outline-none 
              focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 text-[13px] font-medium">
                Điện thoại:
              </label>
              <input
                value={user?.profile?.phone}
                type="number"
                placeholder="0984356252"
                className="w-full p-1 px-1.5 border border-gray-300 rounded focus:outline-none 
                focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Ungtuyen_form;
