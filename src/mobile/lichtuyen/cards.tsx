import { Tooltip } from "antd";
import React from "react";
import { TbAlertSquareRoundedFilled } from "react-icons/tb";
import { useAuth } from "../../context/authContext";
import { FaLocationDot } from "react-icons/fa6";
import { MdMeetingRoom, MdOutlineAttachMoney } from "react-icons/md";
import Ungtuyen_form from "./ungtuyen";
import CompanyCard from "../../components/CompanyCard";
import { IoIosAlarm } from "react-icons/io";
import { GiDoorHandle } from "react-icons/gi";
import { Link, useParams } from "react-router-dom";

export interface TinType {
  id: number;
  code: string;
  companies: number;
  thuong: boolean;
  thuong_sotien: number;
  thuong_dieukien: string;
  share_count: number;
  mucluong: string;
  min_old: number;
  max_old: number;
  apply_count: number;
  title: string;
  loaihinh: string;
  noidungbosung: string;
  urgent: boolean;
  luongcoban: number;
  phucap: number;
  chuyencan: number;
  calamviec: string;
  images_details: any[];
  phongsach: boolean;
  cuatu: boolean;
  luongtuan: boolean;
  active: boolean;
  view_count: number;
  likes: any[];
  shares: any[];
}
const Lichtuyen_cards = ({ tin }: { tin: TinType }) => {
  const { init } = useAuth();
  const params = useParams();
  const comp = init?.companies?.find((c) => c?.id === tin?.companies);
  return (
    <div className="item relative" key={tin?.id}>
      {tin?.thuong && (
        <Tooltip
          title={
            tin?.thuong ? (
              <div className="flex flex-col text-black p-1 min-w-[200px]">
                <div className="flex flex-col text-[13px] text-[#22242c]">
                  <div className="flex gap-1 font-medium items-center">
                    <TbAlertSquareRoundedFilled />
                    Điều kiện:
                  </div>
                  <div className="flex flex-col bg-[#eee] rounded p-1 px-2 mt-1">
                    <pre>{tin?.thuong_dieukien || ""}</pre>
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
            Thưởng {tin?.thuong_sotien?.toLocaleString()}Đ
          </div>
        </Tooltip>
      )}
      {tin?.urgent && (
        <>
          {tin?.thuong ? (
            <div className="hot-card top-6!">
              <TbAlertSquareRoundedFilled /> Tuyển gấp
            </div>
          ) : (
            <div className="hot-card">
              <TbAlertSquareRoundedFilled /> Tuyển gấp
            </div>
          )}
        </>
      )}
      <div className="flex gap-2">
        <CompanyCard companyData={comp}>
          <div className="avatar relative z-1 mt-1.5">
            <img src={comp?.logo} />
          </div>
        </CompanyCard>
        <div className="information">
          <div className="title">{tin?.title}</div>
          <div className="flex">
            <CompanyCard companyData={comp}>
              <div className="name">{comp?.name}</div>
            </CompanyCard>
          </div>
          <div className="address">
            <FaLocationDot />
            {comp?.address || "Chưa rõ"}
          </div>
        </div>
      </div>
      <div className="details flex gap-1 flex-wrap">
        <div
          className="flex text-[10px] font-medium text-[white] bg-[#100068] 
                                    px-1 rounded py-0.5 items-center gap-1"
        >
          Tuổi: {tin?.min_old} - {tin?.max_old}
        </div>
        {tin?.luongtuan ? (
          <div
            className="flex text-[10px] font-medium text-[white] bg-[#0050ac] 
                                    px-1 rounded py-0.5 items-center gap-1"
          >
            <IoIosAlarm />
            Lương tuần
          </div>
        ) : (
          <></>
        )}
        {tin?.phongsach ? (
          <div
            className="flex text-[10px] font-medium text-[white] bg-[#69a9c7] 
                                    px-1 rounded py-0.5 gap-1 items-center"
          >
            <MdMeetingRoom />
            Phòng sạch
          </div>
        ) : (
          <></>
        )}
        {tin?.cuatu ? (
          <div
            className="flex text-[10px] font-medium text-[white] bg-[#abc2db] 
                                    px-1 rounded py-0.5 items-center gap-1"
          >
            <GiDoorHandle />
            Có cửa từ
          </div>
        ) : (
          <div
            className="flex text-[10px] font-medium text-[white] bg-[#308bec] 
                                    px-1 rounded py-0.5 items-center gap-1"
          >
            <GiDoorHandle />
            Không cửa từ
          </div>
        )}
      </div>
      <div className="salary">
        <div className="icon">
          <MdOutlineAttachMoney size={15} />
        </div>
        {tin?.mucluong || "Liên hệ"}
        <Link
          to={`/mobile/lichtuyen/tin/${tin?.code}`}
          className="btn ungtuyen"
        >
          Ứng tuyển
        </Link>
      </div>
      <Link
        to={`/mobile/lichtuyen/tin/${tin?.code}`}
        className="absolute w-full h-full"
      >
        <div className="mask" />
      </Link>
    </div>
  );
};

export default Lichtuyen_cards;
