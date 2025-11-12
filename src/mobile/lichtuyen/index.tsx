import React from "react";
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

  return (
    <div className="flex flex-col max-w-screen overflow-y-auto pb-44">
      <div className="min-h-14 bg-white shadow pl-2 flex items-center">
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
        <div className="font-medium flex items-center gap-1">
          <BsBookmarkHeartFill size={16} />
          Phù hợp với bạn
        </div>
        <div className="lichtuyen flex mt-2">
          <div className="item">
            <Tooltip
              title={
                <div className="flex flex-col text-black p-1 min-w-[200px]">
                  <div className="flex flex-col text-[13px] text-[#22242c]">
                    <div className="flex gap-1 font-medium items-center">
                      <TbAlertSquareRoundedFilled />
                      Điều kiện:
                    </div>
                    <div className="flex flex-col bg-[#eee] rounded p-1 px-2 mt-1">
                      <div className="flex">- Là công nhân mới</div>
                      <div className="flex">- Làm đủ 10 ngày công</div>
                    </div>
                  </div>
                  <div className="btn justify-center ungtuyen relative! mt-2 h-8 py-0! px-2!">
                    Ứng tuyển ngay!
                  </div>
                </div>
              }
              color="white"
              trigger="click"
              placement="topLeft"
            >
              <div className="hot-card">
                <TbAlertSquareRoundedFilled />
                Thưởng 1Tr
              </div>
            </Tooltip>
            <div className="flex gap-2">
              <div className="avatar">
                <img src="https://media.licdn.com/dms/image/v2/D4D0BAQGMYqiU1GnehQ/company-logo_200_200/B4DZY4vvROGwAM-/0/1744708761120/compal_logo?e=2147483647&v=beta&t=YSUJcJQd8Foa9X1zr-KqRje8LMrbsKLXugkfvBeoJ-g" />
              </div>
              <div className="information">
                <div className="title">Bảo an</div>
                <div className="details">
                  <div className="dt-item">40 - 52 tuổi</div>
                  <div className="dt-item">Phòng sạch</div>
                  <div className="dt-item">Cửa từ</div>
                </div>
                <div className="name">Compal</div>
                <div className="address">
                  <FaLocationDot size={10} className="mb-px" />
                  Bá Thiện I - Bình Xuyên - Phú Thọ
                </div>
              </div>
            </div>
            <div className="salary">
              <div className="icon">
                <MdOutlineAttachMoney size={15} />
              </div>
              8-12 Triệu
              <div className="btn ungtuyen">Ứng tuyển</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lichtuyen_index;
