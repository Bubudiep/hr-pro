import { Button } from "antd";
import type { ReactNode } from "react";
import { TbAlertSquareRoundedFilled } from "react-icons/tb";
import Dangnhap from "./Dangnhap";
import Dangky from "./Dangky";

const ChuaDangnhap = ({ children }: { children?: ReactNode }) => {
  return children ? (
    children
  ) : (
    <div className="w-screen flex flex-col items-center p-8 fadeInTop min-h-screen">
      <div className="flex p-6 bg-[white] w-full rounded-xl shadow">
        <div className="w-10 h-10 min-w-10">
          <TbAlertSquareRoundedFilled size={26} />
        </div>
        <div className="flex flex-col">
          <div className="flex text-[17px] font-medium">Yêu cầu đăng nhập</div>
          <div className="mt-2">
            Chức năng chỉ dành cho thành viên, vui lòng đăng nhập mới được sử
            dụng!
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Dangky>
              <Button>Đăng ký</Button>
            </Dangky>
            <Dangnhap>
              <Button type="primary">Đăng nhập</Button>
            </Dangnhap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChuaDangnhap;
