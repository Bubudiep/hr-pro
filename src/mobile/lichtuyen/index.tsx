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
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex flex-col bg-[white] shadow rounded-xl p-3 gap-3 relative">
            <div className="absolute shadow px-2 -right-0.5 -top-0.5 bg-[red] text-white font-medium">
              Thưởng 1Tr
            </div>
            <div className="absolute right-0 -z-1 rotate-45 top-0 bg-[#444444] w-5 h-5" />
            <div className="flex gap-2">
              <div className="min-w-12 w-12 h-12 overflow-hidden">
                <img src="https://media.licdn.com/dms/image/v2/D4D0BAQGMYqiU1GnehQ/company-logo_200_200/B4DZY4vvROGwAM-/0/1744708761120/compal_logo?e=2147483647&v=beta&t=YSUJcJQd8Foa9X1zr-KqRje8LMrbsKLXugkfvBeoJ-g" />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[16px] font-medium mt-1">Bảo an</div>
                <div className="flex gap-1 mt-1">
                  <div className="text-[11px] px-1 pt-0.5 rounded-sm text-[white] bg-[#55596d]">
                    40 - 52 tuổi
                  </div>
                  <div className="text-[11px] px-1 pt-0.5 rounded-sm text-[white] bg-[#55596d]">
                    Phòng sạch
                  </div>
                  <div className="text-[11px] px-1 pt-0.5 rounded-sm text-[white] bg-[#55596d]">
                    Cửa từ
                  </div>
                </div>
                <div className="text-[13px] font-medium text-[#07f] mt-1">
                  Compal
                </div>
                <div className="flex items-center gap-1 text-[12px] text-[#999] leading-3 mt-px">
                  <FaLocationDot size={10} className="mb-px" />
                  Bá Thiện I - Bình Xuyên - Phú Thọ
                </div>
              </div>
            </div>
            <div className="flex relative bg-[#e5ebf7] gap-2 items-center text-[#093180] font-medium rounded-lg px-2 py-1">
              <div className="bg-[#093180] text-white w-6 h-6 flex items-center justify-center rounded-full">
                <MdOutlineAttachMoney size={15} />
              </div>
              8-12 Triệu
              <div
                className="absolute right-0 bg-[#07f] border border-white p-2 rounded-lg text-[white] 
                font-medium px-4 shadow"
              >
                Ứng tuyển
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-[white] shadow rounded-xl p-3 gap-3 relative">
            <div className="absolute shadow px-2 -right-0.5 -top-0.5 bg-[red] text-white font-medium">
              Thưởng 700K
            </div>
            <div className="absolute right-0 -z-1 rotate-45 top-0 bg-[#444444] w-5 h-5" />
            <div className="flex gap-2">
              <div className="min-w-12 w-12 h-12 overflow-hidden">
                <img src="https://media.licdn.com/dms/image/v2/D4D0BAQGMYqiU1GnehQ/company-logo_200_200/B4DZY4vvROGwAM-/0/1744708761120/compal_logo?e=2147483647&v=beta&t=YSUJcJQd8Foa9X1zr-KqRje8LMrbsKLXugkfvBeoJ-g" />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[16px] font-medium mt-1">
                  Công nhân láp ráp sản phẩm (tai nghe)
                </div>
                <div className="flex gap-1 mt-1">
                  <div className="text-[11px] px-1 pt-0.5 rounded-sm text-[white] bg-[#55596d]">
                    18 - 23 tuổi
                  </div>
                  <div className="text-[11px] px-1 pt-0.5 rounded-sm text-[white] bg-[#55596d]">
                    Phòng sạch
                  </div>
                  <div className="text-[11px] px-1 pt-0.5 rounded-sm text-[white] bg-[#55596d]">
                    Cửa từ
                  </div>
                </div>
                <div className="text-[13px] font-medium text-[#07f] mt-1">
                  Compal
                </div>
                <div className="flex items-center gap-1 text-[12px] text-[#999] leading-3 mt-px">
                  <FaLocationDot size={10} className="mb-px" />
                  Bá Thiện I - Bình Xuyên - Phú Thọ
                </div>
              </div>
            </div>
            <div className="flex relative bg-[#e5ebf7] gap-2 items-center text-[#093180] font-medium rounded-lg px-2 py-1">
              <div className="bg-[#093180] text-white w-6 h-6 flex items-center justify-center rounded-full">
                <MdOutlineAttachMoney size={15} />
              </div>
              9-15 Triệu
              <div
                className="absolute right-0 bg-[#07f] border border-white p-2 rounded-lg text-[white] 
                font-medium px-4 shadow"
              >
                Ứng tuyển
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-[white] shadow rounded-xl p-3 gap-3 relative">
            <div className="absolute shadow px-2 -right-0.5 -top-0.5 bg-[red] text-white font-medium">
              Thưởng 700K
            </div>
            <div className="absolute right-0 -z-1 rotate-45 top-0 bg-[#444444] w-5 h-5" />
            <div className="flex gap-2">
              <div className="min-w-12 w-12 h-12 overflow-hidden">
                <img src="https://media.licdn.com/dms/image/v2/D4D0BAQGMYqiU1GnehQ/company-logo_200_200/B4DZY4vvROGwAM-/0/1744708761120/compal_logo?e=2147483647&v=beta&t=YSUJcJQd8Foa9X1zr-KqRje8LMrbsKLXugkfvBeoJ-g" />
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-[16px] font-medium mt-1">
                  Công nhân láp ráp sản phẩm (tai nghe)
                </div>
                <div className="flex gap-1 mt-1">
                  <div className="text-[11px] px-1 pt-0.5 rounded-sm text-[white] bg-[#55596d]">
                    18 - 23 tuổi
                  </div>
                  <div className="text-[11px] px-1 pt-0.5 rounded-sm text-[white] bg-[#55596d]">
                    Phòng sạch
                  </div>
                  <div className="text-[11px] px-1 pt-0.5 rounded-sm text-[white] bg-[#55596d]">
                    Cửa từ
                  </div>
                </div>
                <div className="text-[13px] font-medium text-[#07f] mt-1">
                  Compal
                </div>
                <div className="flex items-center gap-1 text-[12px] text-[#999] leading-3 mt-px">
                  <FaLocationDot size={10} className="mb-px" />
                  Bá Thiện I - Bình Xuyên - Phú Thọ
                </div>
              </div>
            </div>
            <div className="flex relative bg-[#e5ebf7] gap-2 items-center text-[#093180] font-medium rounded-lg px-2 py-1">
              <div className="bg-[#093180] text-white w-6 h-6 flex items-center justify-center rounded-full">
                <MdOutlineAttachMoney size={15} />
              </div>
              8-12 Triệu
              <div
                className="absolute right-0 bg-[#07f] border border-white p-2 rounded-lg text-[white] 
                font-medium px-4 shadow"
              >
                Ứng tuyển
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lichtuyen_index;
