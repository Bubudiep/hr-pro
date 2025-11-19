import { Tooltip } from "antd";
import React from "react";
import { TbAlertSquareRoundedFilled } from "react-icons/tb";
import { useAuth } from "../../context/authContext";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import Ungtuyen_form from "./ungtuyen";
import CompanyCard from "../../components/CompanyCard";

interface TinType {
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
}
const Lichtuyen_cards = ({ tin }: { tin: TinType }) => {
  const { init } = useAuth();
  const comp = init?.companies?.find((c) => c?.id === tin?.companies);
  return (
    <div className="item relative" key={tin?.id}>
      {tin?.thuong && (
        <Tooltip
          title={
            tin?.dieukien_thuong ? (
              <div className="flex flex-col text-black p-1 min-w-[200px]">
                <div className="flex flex-col text-[13px] text-[#22242c]">
                  <div className="flex gap-1 font-medium items-center">
                    <TbAlertSquareRoundedFilled />
                    Điều kiện:
                  </div>
                  <div className="flex flex-col bg-[#eee] rounded p-1 px-2 mt-1">
                    <pre>{tin?.dieukien_thuong || ""}</pre>
                  </div>
                </div>
                <Ungtuyen_form
                  tin={tin}
                  className="btn justify-center ungtuyen relative! mt-2 h-8 py-0! px-2!"
                >
                  Ứng tuyển ngay!
                </Ungtuyen_form>
              </div>
            ) : (
              false
            )
          }
          color="white"
          trigger="click"
          placement="topLeft"
        >
          <div className="hot-card">
            <TbAlertSquareRoundedFilled />
            Thưởng {tin?.thuong?.toLocaleString()}Đ
          </div>
        </Tooltip>
      )}
      <div className="flex gap-2">
        <CompanyCard companyData={comp}>
          <div className="avatar relative z-1">
            <img src={comp?.logo} />
          </div>
        </CompanyCard>
        <div className="information">
          <div className="title">
            ({tin?.bophan}) {tin?.vitri}
          </div>
          <CompanyCard companyData={comp}>
            <div className="name relative z-1">{comp?.name}</div>
          </CompanyCard>
          <div className="address">
            <FaLocationDot size={10} className="mb-px" />
            {comp?.address || "Chưa rõ"}
          </div>
        </div>
      </div>
      <div className="details">
        <div className="dt-item">
          {tin?.min_old} - {tin?.max_old} tuổi
        </div>
        {/* <div className="dt-item">Phòng sạch</div>
                  <div className="dt-item">Cửa từ</div> */}
      </div>
      <div className="salary">
        <div className="icon">
          <MdOutlineAttachMoney size={15} />
        </div>
        {tin?.mucluong || "Liên hệ"}
        <Ungtuyen_form tin={tin} className="btn ungtuyen">
          Ứng tuyển
        </Ungtuyen_form>
      </div>
      <Ungtuyen_form tin={tin} className="absolute w-full h-full">
        <div className="mask" />
      </Ungtuyen_form>
    </div>
  );
};

export default Lichtuyen_cards;
