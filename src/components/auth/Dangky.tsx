import { message, Modal } from "antd";
import React, { useState, type ReactNode } from "react";
import { FaUser } from "react-icons/fa";
import { HiLockClosed } from "react-icons/hi";
import logo from "../../assets/image/logo.png";
import zalo from "../../assets/image/zalo.png";
import { MdOutlinePassword } from "react-icons/md";
import Api from "../api";
import { useAuth } from "../../context/authContext";

const Dangky = ({ children }: { children?: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [loadingReg, setLoadingReg] = useState(false);
  const [modalData, setModalData] = useState({
    username: "",
    password: "",
    "re-password": "",
  });
  const { login } = useAuth();
  const handleCallback = (e: boolean) => {
    console.log(e);
  };
  const handleDangky = () => {
    if (modalData.password.length < 6) {
      message.error("Mật khẩu phải từ 6 ký tự trở lên!");
      return;
    }
    if (modalData.password !== modalData["re-password"]) {
      message.error("Mật khẩu không khớp nhau!");
      return;
    }
    setLoadingReg(true);
    Api.post("/reg/", modalData)
      .then((res) => {
        setShowModal(false);
        login(
          modalData?.username || "",
          modalData?.password || "",
          true,
          handleCallback
        );
      })
      .catch((e) => Api.error(e))
      .finally(() => setLoadingReg(false));
  };
  return (
    <>
      <div onClick={() => setShowModal(true)}>{children || <></>}</div>
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        okText="Đăng ký"
        cancelText="Đóng"
        confirmLoading={loadingReg}
        onOk={handleDangky}
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 items-baseline mt-4">
            <img src={logo} className="w-[88px]" />
          </div>
          <div className="flex font-medium text-[13px] mb-1 text-[#00a6ff]">
            Nhập thông tin đăng ký:
          </div>
          <div
            className="flex border border-[#0003] p-2 rounded-md transition-all
                    items-center focus-within:border-[#07f] shadow duration-300
                    focus-within:shadow-[#0077ff31]"
          >
            <FaUser className="px-2 w-7 focus:text-[#07f]" size={22} />
            <input
              value={modalData?.username}
              onChange={(e) =>
                setModalData((o) => ({ ...o, username: e?.target.value }))
              }
              className="outline-0 ml-1 w-full"
              placeholder="Số điện thoại..."
            />
          </div>
          <div
            className="flex border border-[#0003] p-2 rounded-md transition-all
                    items-center focus-within:border-[#07f] shadow duration-300
                    focus-within:shadow-[#0077ff31] mt-1"
          >
            <MdOutlinePassword
              className="w-7 focus:text-[#07f] peer-focus:text-[#07f]"
              size={18}
            />
            <input
              value={modalData?.password}
              onChange={(e) =>
                setModalData((o) => ({ ...o, password: e?.target.value }))
              }
              className="outline-0 ml-1 w-full"
              type="password"
              placeholder="Mật khẩu..."
            />
          </div>
          <div
            className="flex border border-[#0003] p-2 rounded-md transition-all
                    items-center focus-within:border-[#07f] shadow duration-300
                    focus-within:shadow-[#0077ff31] mt-1"
          >
            <MdOutlinePassword
              className="w-7 focus:text-[#07f] peer-focus:text-[#07f]"
              size={18}
            />
            <input
              value={modalData?.["re-password"]}
              onChange={(e) =>
                setModalData((o) => ({
                  ...o,
                  ["re-password"]: e?.target.value,
                }))
              }
              className="outline-0 ml-1 w-full"
              type="password"
              placeholder="Nhập lại mật khẩu..."
            />
          </div>
          {/* <div className="flex text-[12px] text-[#00a6ff] font-medium">
            Tùy chọn:
          </div>
          <div className="rounded-md text-[#364972] border border-[#d9e3f8] items-center bg-[#c9dbf052] p-2 gap-3 text-[13px] flex">
            <div className="w-6">
              <img src={zalo} />
            </div>
            Đăng ký bằng tài khoản Zalo
          </div> */}
        </div>
      </Modal>
    </>
  );
};

export default Dangky;
