import { Modal } from "antd";
import { useRef, useState, type ReactNode } from "react";
import { BsPatchQuestionFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { HiLockClosed } from "react-icons/hi";
import logo from "../../assets/image/logo.png";
import Spark from "../Spark";
import { useAuth } from "../../context/authContext";
interface loginForm {
  username: string;
  password: string;
  remember: boolean;
}
const Dangnhap = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [loginData, setLoginData] = useState<loginForm>({
    username: "",
    password: "",
    remember: true,
  });
  const userRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { login } = useAuth();
  const handleCallback = (e: boolean) => {
    console.log(e);
  };
  const handleLogin = () => {
    setShowModal(false);
    login(
      loginData?.username || "",
      loginData?.password || "",
      loginData?.remember,
      handleCallback
    );
  };
  return (
    <>
      <div className={className} onClick={() => setShowModal(true)}>
        {children || <></>}
      </div>
      <Modal
        title=""
        open={showModal}
        onCancel={() => setShowModal(false)}
        okText="Đăng nhập"
        cancelText="Đóng"
        onOk={handleLogin}
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 items-baseline mt-4">
            <img src={logo} className="w-[88px]" />
          </div>
          <div className="flex font-medium text-[13px] mb-1 text-[#00a6ff]">
            Xin chào, trước tiên bạn cần đăng nhập!
          </div>
          <div
            className="flex border border-[#0003] p-2 rounded-md transition-all
            items-center focus-within:border-[#07f] shadow duration-300
            focus-within:shadow-[#0077ff31] mt-1"
          >
            <FaUser className="px-2 w-7 focus:text-[#07f]" size={22} />
            <input
              ref={userRef}
              className="outline-0 ml-1 w-full"
              value={loginData.username}
              onChange={(e) =>
                setLoginData((o) => ({ ...o, username: e?.target?.value }))
              }
              onKeyDown={(e) => {
                if (e?.key === "Enter") passwordRef?.current?.focus();
              }}
              placeholder="Số điện thoại..."
            />
          </div>
          <div
            className="flex border border-[#0003] p-2 rounded-md transition-all
            items-center focus-within:border-[#07f] shadow duration-300
            focus-within:shadow-[#0077ff31] mt-1"
          >
            <HiLockClosed
              className="w-7 focus:text-[#07f] peer-focus:text-[#07f]"
              size={18}
            />
            <input
              ref={passwordRef}
              className="outline-0 ml-1 w-full"
              type="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData((o) => ({ ...o, password: e?.target?.value }))
              }
              onKeyDown={(e) => {
                if (e?.key === "Enter") handleLogin();
              }}
              placeholder="Mật khẩu..."
            />
          </div>
          <div className="flex mt-2">
            <label
              className={`flex gap-1.5 items-center transition-all duration-300 text-[12px] ${
                loginData.remember ? "text-[#006eff]" : "text-[#999]"
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                onChange={(e) =>
                  setLoginData((o) => ({
                    ...o,
                    remember: e?.target?.checked,
                  }))
                }
                checked={loginData.remember}
              />
              <Spark active={loginData.remember}>
                <BsPatchQuestionFill size={14} />
              </Spark>
              <div>Nhớ mật khẩu?</div>
            </label>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Dangnhap;
