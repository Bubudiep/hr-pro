import { Image, message, Modal } from "antd";
import React, { useState, type ReactNode } from "react";
import { useAuth } from "../../context/authContext";
import { FaLocationDot } from "react-icons/fa6";
import { HiBellAlert } from "react-icons/hi2";
import { FaArrowRight } from "react-icons/fa";
import type { TinType } from "./cards";
interface UntuyenType {
  children: ReactNode;
  className: string;
  tin: TinType;
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
              <div className="flex flex-col text-[13px]">
                <div className="flex w-full list_img">
                  {tin?.images_details?.map((img) => (
                    <div
                      key={img.uid}
                      className={`max-h-[140px] overflow-hidden rounded-md w-full object-cover flex-1 border border-[#eee] bg-[#eee]
                  ${
                    tin?.images_details?.length === 3
                      ? "aspect-1/3"
                      : tin?.images_details?.length === 2
                      ? "aspect-3/2"
                      : "aspect-5/3"
                  }`}
                    >
                      <Image src={img.url} />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <b className="font-medium text-[18px]">{tin?.title}</b>
                </div>
                <div className="font-medium text-[14px] text-[#3d61af]">
                  {tin?.mucluong || "Lương hấp dẫn"}
                </div>
                <div className="company_card flex gap-2 p-1 items-center rounded-lg shadow my-1">
                  <div className="flex avatar w-8 min-w-8">
                    <img src={comp?.logo} className="object-cover" />
                  </div>
                  <div className="flex font-medium text-[15px]">
                    {comp?.name}
                  </div>
                </div>
                <div className="flex gap-1">
                  <b className="bg-[#3d61af] font-medium text-[white] mt-1 p-0.5 rounded px-2 text-[11px]">
                    {tin?.loaihinh === "tv" ? "Thời vụ" : "Chính thức"}
                  </b>
                  <b className="bg-[#65347c] font-medium text-[white] mt-1 p-0.5 rounded px-2 text-[11px]">
                    {tin?.calamviec === "2ca"
                      ? "Ca ngày/đêm"
                      : tin?.calamviec === "3ca"
                      ? "3 ca"
                      : "Hành chính"}
                  </b>
                </div>
                {tin?.luongcoban ? (
                  <div className="flex gap-1 mt-1 justify-between">
                    Lương cơ bản:
                    <div className="flex text-[#0077ff] font-medium">
                      {tin?.luongcoban?.toLocaleString()}VNĐ
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {tin?.phucap ? (
                  <div className="flex gap-1 mt-1 justify-between">
                    Phụ cấp:
                    <div className="flex text-[#0077ff] font-medium">
                      {tin?.phucap?.toLocaleString()}VNĐ
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {tin?.chuyencan ? (
                  <div className="flex gap-1 mt-1 justify-between">
                    Chuyên cần:
                    <div className="flex text-[#0077ff] font-medium">
                      {tin?.chuyencan?.toLocaleString()}VNĐ
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {tin?.thuong && (
                  <>
                    <div className="flex font-medium justify-between mt-1">
                      Thưởng nóng:
                      <b className="text-[#fd5d00] text-[15px]">
                        {tin?.thuong_sotien?.toLocaleString()}VNĐ
                      </b>
                    </div>
                    <div className="flex font-medium mt-1 items-center gap-1 text-[#1a346d]">
                      <HiBellAlert />
                      Điều kiện thưởng:
                    </div>
                    <pre className="p-2 bg-[#e7ebf5] rounded-md mt-0.5">
                      {tin?.thuong_dieukien || "- Không có điều kiện!"}
                    </pre>
                  </>
                )}
              </div>
            </div>
            <div className="border border-[#073264] rounded-md overflow-hidden">
              <div className="flex bg-[#073264] text-white font-medium p-2">
                Thông tin ứng tuyển
              </div>
              <div className="flex flex-col p-2">
                <div className="mb-1">
                  <label className="block text-gray-700 text-[13px] font-medium">
                    Họ và Tên:
                  </label>
                  <input
                    value={user?.profile?.name || ""}
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className="w-full p-1 px-1.5 border border-gray-300 rounded focus:outline-none 
                  focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-1">
                  <label className="block text-gray-700 text-[13px] font-medium">
                    Điện thoại:
                  </label>
                  <input
                    value={user?.profile?.phone || ""}
                    type="number"
                    placeholder="0984356252"
                    className="w-full p-1 px-1.5 border border-gray-300 rounded focus:outline-none 
                    focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Ungtuyen_form;
