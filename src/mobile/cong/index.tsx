import React, { useState, useEffect, useMemo } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useUser } from "../../context/userContext";
import { TbAlertSquareRoundedFilled } from "react-icons/tb";
import { Button } from "antd";

// Định nghĩa kiểu dữ liệu cho một ngày trong lịch
interface DayInfo {
  day: number | null;
  isCurrentMonth: boolean;
  isToday: boolean;
  fullDate?: Date;
}

const CongIndex: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = useMemo(() => new Date(), []); // Ngày hôm nay cố định

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Tên các ngày trong tuần (Bắt đầu từ Chủ Nhật)
  const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const calendarDays: DayInfo[] = useMemo(() => {
    const days: DayInfo[] = [];
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 (CN) đến 6 (T7)
    const prevMonth = new Date(currentYear, currentMonth, 0);
    const daysInPrevMonth = prevMonth.getDate();
    for (let i = firstDayOfMonth; i > 0; i--) {
      const dayNum = daysInPrevMonth - i + 1;
      days.push({
        day: dayNum,
        isCurrentMonth: false,
        isToday: false,
        fullDate: new Date(currentYear, currentMonth - 1, dayNum),
      });
    }

    // 3. Logic cho THÁNG HIỆN TẠI
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        i === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      days.push({
        day: i,
        isCurrentMonth: true,
        isToday: isToday,
        fullDate: new Date(currentYear, currentMonth, i),
      });
    }

    // 4. Logic cho THÁNG SAU (Trailing days)
    const totalDays = days.length;
    const remainingSlots = 42 - totalDays; // 6 hàng x 7 cột = 42 ô (đảm bảo hiển thị đủ)

    for (let i = 1; i <= remainingSlots; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isToday: false,
        fullDate: new Date(currentYear, currentMonth + 1, i),
      });
    }

    // Cắt bớt nếu số ngày không vượt quá 5 hàng (ví dụ: 35 ô)
    return days.slice(0, days.length > 35 && firstDayOfMonth > 5 ? 42 : 35);
  }, [currentDate, currentMonth, currentYear, today]); // Phụ thuộc vào currentDate

  /**
   * Hàm chuyển đổi tháng
   */
  const handleMonthChange = (direction: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() + direction,
        1
      );
      return newDate;
    });
  };
  const { profile, setProfile } = useUser();
  return profile?.id ? (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center mb-3 bg-white shadow p-4 h-14">
        <button
          onClick={() => handleMonthChange(-1)}
          className="p-3 hover:bg-gray-100 rounded-full"
        >
          <FaAngleLeft size={16} />
        </button>
        <h2 className="font-medium">
          Tháng {currentMonth + 1}, {currentYear}
        </h2>
        <button
          onClick={() => handleMonthChange(1)}
          className="p-3 hover:bg-gray-100 rounded-full"
        >
          <FaAngleRight size={16} />
        </button>
      </div>
      <div className="flex flex-col px-2 gap-2">
        <div className="flex flex-col bg-white rounded-xl shadow overflow-hidden">
          <div className="flex justify-center py-4 px-2 border-b border-[#0002]">
            Hôm nay bạn chưa chấm công!!!
          </div>
          <div className="flex items-center text-[13px]">
            <div className="text-[#07f] flex-1 border-r border-[#0002] justify-center flex w-full p-2">
              Chấm công ngay
            </div>
            <div className="flex flex-1 justify-center text-[#999]">Để sau</div>
          </div>
        </div>
        <div className="flex flex-col bg-white shadow rounded-xl overflow-hidden">
          <div className="grid grid-cols-7 text-center text-[13px]">
            {dayNames.map((dayName) => (
              <div
                key={dayName}
                className={`font-semibold border-b border-[#0002] py-3 ${
                  dayName === "CN" ? "text-[#ff5100]" : "text-[#262829]"
                }`}
              >
                {dayName}
              </div>
            ))}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={` bg-[#fafafa]
                p-1 h-10 w-full flex items-center justify-center transition-all cursor-pointer
                ${day.isToday ? "text-[#07f] font-bold" : ""}
                ${
                  !day.isToday && day.isCurrentMonth
                    ? "text-gray-800 hover:bg-blue-50"
                    : ""
                }
                ${!day.isCurrentMonth ? "text-[#0003]" : ""}
              `}
                onClick={() => console.log(day)}
              >
                {day.day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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
            <Button>Đăng ký</Button>
            <Button type="primary">Đăng nhập</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongIndex;
