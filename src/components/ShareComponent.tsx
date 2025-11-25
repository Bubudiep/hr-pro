import React, { useState } from "react";
import { Modal, message } from "antd"; // Chỉ lấy Modal và message logic từ Antd
import {
  CopyOutlined,
  FacebookFilled,
  MessageFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";
import Api from "./api";
import type { TinType } from "../mobile/lichtuyen/cards";
import { putMultiple } from "../db/App_db";

// Icon Zalo (SVG thuần)
const ZaloIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="currentColor">
    <path d="M40.6 28.5c-.4 0-.7.2-.8.6-.9 4.4-4.9 7.7-9.7 7.7h-2.1c-.3 1.6-1.3 2.9-2.8 3.4.3.2.7.3 1.1.3 1.5 0 2.9-.7 3.9-1.9 2.1.6 4.9.8 6.6.3 1-.3.3-1.6-.6-1.3-.9.3-2.6.2-4.2-.3 2.5-1.4 4.2-4 4.6-6.9.1-.4-.2-.8-.6-.8h-1.4zM22 9C13.2 9 6 15 6 22.5c0 3.3 1.4 6.3 3.7 8.6l-1 3.2c-.3 1 .8 1.9 1.7 1.2l4.3-3.1c2.1.7 4.5 1.1 7 1.1 8.8 0 16-6.1 16-13.5S30.8 9 22 9zm5.6 15h-8c-.6 0-1-.4-1-1s.4-1 1-1h4.6c-.6-1.7-2-4.3-4.3-4.3h-1.3c-.6 0-1-.4-1-1s.4-1 1-1h7c.6 0 1 .4 1 1s-.4 1-1 1H22c1.9 5.3 4.3 5.3 4.6 5.3.6 0 1 .4 1 1s-.5 1-1 1z" />
  </svg>
);

interface ShareModalProps {
  children: React.ReactNode;
  shareComponent: React.ReactNode;
  url?: string;
  title?: string;
  tin?: TinType;
}

const ShareModal: React.FC<ShareModalProps> = ({
  tin,
  shareComponent,
  children,
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "Xem nội dung này nhé!",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCopy = async () => {
    try {
      Api.post(`tin/${tin?.id}/share/`, {}).then((res) =>
        putMultiple("TuyenDung", [res])
      );
      await navigator.clipboard.writeText(url);
      message.success({
        content: "Đã copy link vào bộ nhớ tạm!",
      });
    } catch (err) {
      message.error("Không thể copy link");
    }
  };
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    zalo: `https://sp.zalo.me/share_inline?link=${encodedUrl}`,
    sms: `sms:?&body=${encodedTitle}%20${encodedUrl}`,
  };
  return (
    <>
      <div
        onClick={() => {
          setIsModalOpen(true);
          handleCopy();
        }}
        className="inline-block cursor-pointer"
      >
        {children}
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={420}
        title={
          <div className="text-center text-lg font-bold text-gray-800">
            Chia sẻ
          </div>
        }
      >
        <div className="-mt-4 flex flex-col gap-1 pb-2">
          <div className="relative flex items-center">
            <input
              type="text"
              readOnly
              value={url}
              className="w-full pl-4 pr-24 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all truncate"
            />
            <button
              onClick={handleCopy}
              className="absolute right-1 top-1 bottom-1 px-4 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 shadow-sm"
            >
              Sao chép
            </button>
          </div>
          <div className="flex py-2 font-medium text-[13px]">
            Thông tin chia sẻ:
          </div>
          {shareComponent}
          {/* <div>
            <p className="text-center text-xs text-gray-400 mb-4 font-medium uppercase tracking-wider">
              Hoặc chia sẻ qua
            </p>
            <div className="flex items-center justify-center gap-8">
              <button
                onClick={() => openShareWindow(shareLinks.facebook)}
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-2xl shadow-lg shadow-blue-200 transition-transform group-hover:-translate-y-1 group-hover:shadow-xl">
                  <FacebookFilled />
                </div>
                <span className="text-xs font-medium text-gray-600 group-hover:text-[#1877F2]">
                  Facebook
                </span>
              </button>
              <button
                onClick={() => openShareWindow(shareLinks.zalo)}
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-[#0068FF] text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-200 transition-transform group-hover:-translate-y-1 group-hover:shadow-xl">
                  <ZaloIcon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-gray-600 group-hover:text-[#0068FF]">
                  Zalo
                </span>
              </button>
              <a
                href={shareLinks.sms}
                className="group flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-[#4ADE80] text-white flex items-center justify-center text-2xl shadow-lg shadow-green-200 transition-transform group-hover:-translate-y-1 group-hover:shadow-xl">
                  <MessageFilled />
                </div>
              </a>
            </div>
          </div> */}
        </div>
      </Modal>
    </>
  );
};

export default ShareModal;
