import { Image, message, Modal } from "antd";
import React, { useEffect, useState, type ReactNode } from "react";
import { useAuth } from "../../context/authContext";
import { FaCircleCheck, FaLocationDot } from "react-icons/fa6";
import { HiBellAlert, HiMiniCheckBadge } from "react-icons/hi2";
import { FaArrowRight, FaCheck, FaShare } from "react-icons/fa";
import type { TinType } from "./cards";
import { BiSolidGift } from "react-icons/bi";
import ShareModal from "../../components/ShareComponent";
import { IoGift } from "react-icons/io5";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Api from "../../components/api";
interface UntuyenType {
  children: ReactNode;
  className: string;
  tin: TinType;
  isOpen?: boolean;
}
const Ungtuyen_form = ({
  children,
  className,
  tin,
  isOpen = false,
}: UntuyenType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ttungtuyen, setTTungtuyen] = useState({
    name: "",
    phone: "",
    invent_code: "",
  });
  const nav = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { init, user } = useAuth();
  const comp = init?.companies?.find((c) => c?.id === tin?.companies);
  const invent_code = searchParams.get("invent_code"); // "red"
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    nav(`/mobile/lichtuyen/`);
  };
  const handleSubmitApplication = () => {
    if (ttungtuyen?.name && ttungtuyen?.phone) {
      setIsLoading(true);
      Api.post(`tin/${tin?.id}/ungtuyen/`, ttungtuyen, user?.access_token || "")
        .then((res) => {
          console.log(res);
          Modal.confirm({
            title: "Thành công!",
            content: "Ứng tuyển thành công, chúng tôi sẽ sớm liên hệ đến bạn!",
            okText: "Đã hiểu",
            cancelText: "Đóng",
            maskClosable: true,
          });
        })
        .catch((e) => Api.error(e))
        .finally(() => setIsLoading(false));
    } else {
      message.error("Chưa nhập đủ thông tin!!");
    }
  };
  useEffect(() => {
    if (isModalOpen && !params?.tin) {
      nav(`/mobile/lichtuyen/tin/${tin?.code}/`);
    }
  }, [isModalOpen, tin?.id]);
  useEffect(() => {
    if (isOpen) {
      setIsModalOpen(true);
    }
    setTTungtuyen({
      name: user?.profile?.name || "",
      phone: user?.profile?.phone || "",
      invent_code: invent_code || "",
    });
  }, []);
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
                <div className="flex gap-2 items-center mb-2">
                  <div className="flex avatar w-8 min-w-8">
                    <img src={comp?.logo} className="object-cover" />
                  </div>
                  <div className="flex font-medium text-[15px]">
                    {comp?.name}
                  </div>
                </div>
                <div className="flex w-full list_img">
                  {tin?.images_details?.map((img) => (
                    <div
                      key={img.uid}
                      className={`max-h-[140px] h-[140px] item overflow-hidden w-full object-cover 
                        flex-1 border border-[#eee] bg-[#eee]
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
                  <b className="font-medium text-[18px] mt-2 leading-4.5">
                    {tin?.title}
                  </b>
                </div>
                <div className="font-medium text-[14px] text-[#3d61af]">
                  {tin?.mucluong || "Lương hấp dẫn"}
                </div>
                <ShareModal
                  url={`${location.origin + location.pathname}/?invent_code=${
                    user?.profile?.invent_code
                  }`}
                  shareComponent={
                    <div className="flex flex-col border-[#0001] shadow border rounded-md overflow-hidden">
                      <div className="flex flex-col border-b border-[#0001] p-2">
                        <div className="flex font-medium text-[14px]">
                          {tin?.title}
                        </div>
                        <div className="font-medium text-[11px] text-[#828a9c]">
                          {tin?.mucluong || "Lương hấp dẫn"}
                        </div>
                        <div className="flex gap-1 flex-wrap mb-1.5">
                          <div className="flex gap-1">
                            <b className="bg-[#3d61af] font-medium text-[white] mt-1 p-0.5 rounded px-2 text-[11px]">
                              {tin?.loaihinh === "tv"
                                ? "Thời vụ"
                                : "Chính thức"}
                            </b>
                            <b className="bg-[#65347c] font-medium text-[white] mt-1 p-0.5 rounded px-2 text-[11px]">
                              {tin?.calamviec === "2ca"
                                ? "Ca ngày/đêm"
                                : tin?.calamviec === "3ca"
                                ? "3 ca"
                                : "Hành chính"}
                            </b>
                          </div>
                        </div>
                        <div
                          className="flex border-[#0003] border rounded-md p-1 bg-[#f1f4f8] gap-1
                          text-[10px] flex-col leading-2"
                        >
                          {tin?.luongcoban ? (
                            <div className="flex gap-1 mt-1 justify-between">
                              Lương cơ bản
                              <div className="flex text-[#526b86] font-medium">
                                {tin?.luongcoban?.toLocaleString()}VNĐ
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                          {tin?.phucap ? (
                            <div className="flex gap-1 mt-1 justify-between">
                              Phụ cấp
                              <div className="flex text-[#526b86] font-medium">
                                {tin?.phucap?.toLocaleString()}VNĐ
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                          {tin?.chuyencan ? (
                            <div className="flex gap-1 mt-1 justify-between">
                              Chuyên cần
                              <div className="flex text-[#526b86] font-medium">
                                {tin?.chuyencan?.toLocaleString()}VNĐ
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                          {tin?.thuong && (
                            <>
                              <div className="flex gap-1 mt-1 mb-1 justify-between font-medium">
                                <div className="flex items-center gap-0.5">
                                  <IoGift />
                                  Thưởng đi làm
                                </div>
                                <div className="text-[#fd5d00]">
                                  {tin?.thuong_sotien?.toLocaleString()}VNĐ
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 items-start p-2">
                        <div className="flex avatar w-7.5 min-w-7.5 rounded overflow-hidden">
                          <img src={comp?.logo} className="object-cover" />
                        </div>
                        <div className="flex flex-col leading-4">
                          <div className="flex font-medium text-[15px] items-center">
                            {comp?.name}
                            <HiMiniCheckBadge className="text-[#57d425] text-[13px] ml-1" />
                          </div>
                          <div className="flex items-center gap-1 text-[10px] font-medium text-[#999]">
                            <FaLocationDot /> {comp?.address}
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                >
                  <div className="flex my-1 border shadow rounded-md border-[#0001] p-2">
                    <div className="flex flex-col">
                      <div className="flex font-medium text-[15px] text-[#f30]">
                        +1.000.000VNĐ/người
                      </div>
                      <div className="flex items-center text-[12px] gap-1 font-medium text-[#f30]">
                        Khi giới thiệu thành công
                      </div>
                    </div>
                    <div
                      className="flex bg-[#f30] ml-auto w-10 h-10 items-center justify-center 
                    text-[white] rounded relative"
                    >
                      <BiSolidGift className="animate-bounce text-[20px] z-1 relative" />
                      <div className="flex w-4 absolute h-1 bg-[#0002] bottom-2 rounded-[99%]"></div>
                    </div>
                  </div>
                </ShareModal>
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
                <div className="mb-1 flex justify-between items-center">
                  <label className="block text-gray-700 text-[13px] w-40 font-medium">
                    <b className="text-red-500 pr-1">*</b>Họ và Tên:
                  </label>
                  <input
                    value={ttungtuyen.name || ""}
                    onChange={(e) =>
                      setTTungtuyen((o) => ({ ...o, name: e?.target?.value }))
                    }
                    type="text"
                    placeholder="Nguyễn Văn A"
                    className="w-full p-1 px-1.5 border border-gray-300 rounded focus:outline-none 
                  focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-1 flex justify-between items-center">
                  <label className="block text-gray-700 text-[13px] w-40 font-medium">
                    <b className="text-red-500 pr-1">*</b>Điện thoại:
                  </label>
                  <input
                    value={ttungtuyen.phone || ""}
                    onChange={(e) =>
                      setTTungtuyen((o) => ({ ...o, phone: e?.target?.value }))
                    }
                    minLength={10}
                    maxLength={10}
                    type="text"
                    placeholder="0984356XXX"
                    className="w-full p-1 px-1.5 border border-gray-300 rounded focus:outline-none 
                    focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-1 flex justify-between items-center">
                  <label className="block text-gray-700 text-[13px] w-40 font-medium">
                    Mã giới thiệu:
                  </label>
                  <input
                    value={ttungtuyen.invent_code || ""}
                    onChange={(e) =>
                      setTTungtuyen((o) => ({
                        ...o,
                        invent_code: e?.target?.value,
                      }))
                    }
                    disabled={invent_code == ttungtuyen.invent_code}
                    type="text"
                    placeholder="HR-XXXXX"
                    className="w-full p-1 px-1.5 border border-gray-300 rounded focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 disabled:bg-[#0001] disabled:text-[#aaaaaa]"
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
