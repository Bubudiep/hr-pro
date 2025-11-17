import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // BẮT BUỘC
import "slick-carousel/slick/slick-theme.css"; // BẮT BUỘC
import { LuSearch } from "react-icons/lu";
import { PiBellLight } from "react-icons/pi";
import { BiSolidBell } from "react-icons/bi";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";
import Spark from "../../components/Spark";
import { Tooltip } from "antd";
import {
  TbAlertSquareRounded,
  TbAlertSquareRoundedFilled,
} from "react-icons/tb";
import { getData } from "../../db/App_db";
import { useAuth } from "../../context/authContext";
import Lichtuyen_cards from "./cards";

const Lichtuyen_index = () => {
  const settings = {
    dots: true, // Hiển thị dấu chấm
    infinite: true, // Vòng lặp vô tận
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Tự động chạy
    autoplaySpeed: 4000, // Thời gian chuyển slide
    arrows: false, // Ẩn mũi tên điều hướng
  };
  const [activeTab, setActiveTab] = useState<string>("all");
  const [listIP, setListIP] = useState<any[]>([]);
  const [tinTuyen, setTinTuyen] = useState<any[]>([]);
  const { init, loading } = useAuth();
  useEffect(() => {
    if (!loading) {
      const fetchData = async () => {
        const qs_ip = await getData("KhuCongNghiep");
        const qs_tin = await getData("TuyenDung");
        setListIP(qs_ip);
        setTinTuyen(qs_tin);
      };
      console.log(init);
      fetchData();
    }
  }, [loading]);
  return (
    <div className="flex flex-col max-w-screen overflow-y-auto pb-44">
      <div className="min-h-14 sticky top-0 z-10 bg-white shadow pl-2 flex items-center">
        <label className="flex gap-1 w-full">
          <div className="text-gray-600 p-2">
            <LuSearch />
          </div>
          <input
            className="outline-0 w-full"
            placeholder="Tìm công ty hoặc công việc...."
          />
        </label>
        <div className="min-w-[58px] relative text-[#999] h-full flex items-center justify-center">
          <BiSolidBell size={24} />
          <div
            className="flex absolute bottom-1.5 right-2 rounded-full w-5.5 h-5.5 bg-[#07f]
            text-[11px] font-medium items-center justify-center text-white border 
            shadow border-white"
          >
            9+
          </div>
        </div>
      </div>
      <div className="p-4">
        <Slider className="mb-8" {...settings}>
          <div className="aspect-2/1 flex! items-center justify-center text-3xl">
            Slide 1
          </div>
          <div className="aspect-2/1 flex! items-center justify-center text-3xl">
            Slide 2
          </div>
          <div className="aspect-2/1 flex! items-center justify-center text-3xl">
            Slide 3
          </div>
        </Slider>
      </div>
      <div className="flex flex-col px-4">
        <div className="filter flex gap-2 overflow-x-auto mb-2 snap-x px-0">
          <div
            className={`item ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            Tất cả
          </div>
          {listIP?.map((ip) => (
            <div
              key={ip?.id}
              className={`item ${activeTab === ip?.name ? "active" : ""}`}
              onClick={() => setActiveTab(ip?.name)}
            >
              {ip?.name}
            </div>
          ))}
        </div>
        <div className="font-medium flex items-center gap-1">
          <BsBookmarkHeartFill size={16} />
          Phù hợp với bạn
        </div>
        <div className="lichtuyen flex mt-2">
          {tinTuyen?.map((tin) => {
            return <Lichtuyen_cards tin={tin} key={tin?.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Lichtuyen_index;
