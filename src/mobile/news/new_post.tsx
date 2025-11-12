import { FaImage, FaPlus, FaUser, FaUserSecret } from "react-icons/fa";
import Baiviet_moi from "../../components/Baiviet_moi";
import { Component, useState, type ReactNode } from "react";
import { BiMessageSquareAdd } from "react-icons/bi";
import { Button } from "antd";
import Dangky from "../../components/auth/Dangky";
import Dangnhap from "../../components/auth/Dangnhap";
import { useAuth } from "../../context/authContext";
const New_post = ({ children }: { children?: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();
  return (
    <>
      <Baiviet_moi showModal={showModal} setShowModal={setShowModal} />
      {user?.profile?.id ? (
        <div className="flex flex-col mb-2" onClick={() => setShowModal(true)}>
          {children ? (
            children
          ) : (
            <div className="flex h-[54] items-center bg-white shadow p-2 gap-2">
              <div
                className="text-[13px] mr-2 w-full rounded-md py-1.5 p-2
              ml-0.5 font-medium text-[#174170] flex gap-2 items-center"
              >
                <BiMessageSquareAdd size={20} />
                Bài viết mới
              </div>
              <div className="avatar">
                <div
                  className="flex w-10 items-center justify-center text-white
              h-10 bg-[#5d7896]"
                >
                  <FaUser />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col sticky top-0 z-100 mb-2">
          {children ? (
            children
          ) : (
            <div className="flex h-[54] items-center bg-white shadow p-2 gap-2">
              <div
                className="text-[13px] mr-2 w-full rounded-md py-1.5 p-2
              ml-0.5 font-medium text-[#174170] flex gap-2 items-center"
              >
                Chưa đăng nhập?
              </div>
              <div className="avatar">
                <div className="flex items-center justify-center h-10 gap-2">
                  <Dangky>
                    <Button>Đăng ký</Button>
                  </Dangky>
                  <Dangnhap>
                    <Button type="primary">Đăng nhập</Button>
                  </Dangnhap>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default New_post;
