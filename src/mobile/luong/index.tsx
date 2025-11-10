import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
const Luong_index = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex h-14 bg-white">
        <div className="flex text-[16px] items-center flex-1 p-2 border-b-2 text-[#07f]">
          Tạm tính
        </div>
        <div className="flex text-[16px] items-center flex-1 p-2 text-[#999]">
          Bảng lương
        </div>
      </div>
      <div className="flex flex-col text-[13px] bg-white shadow p-2 gap-1">
        <div className="flex justify-between items-center">
          <div className="name text-[12px] font-medium">Tạm tính</div>
          <div className="flex gap-1 items-baseline text-[#ff5e00]">
            <b className="font-medium text-[20px]">
              {(1000000).toLocaleString()}
            </b>
            VNĐ
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="name text-[12px] font-medium">Lương tuần</div>
          <div className="value">
            <div className="flex items-center gap-1 text-[#2ab631] text-[12px] font-medium rounded p-1 px-2">
              <FaCircleCheck />
              Đã thanh toán
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="name text-[12px] font-medium">Thời gian</div>
          <div className="value">27/10/2025 - 02/11/2025</div>
        </div>
        <div className="flex flex-col">
          <div className="name text-[12px] font-medium">Chi tiết:</div>
          <table className="mt-2">
            <thead>
              <tr>
                <th className="font-medium text-[11px]">Ngày</th>
                <th className="font-medium text-[11px]">100%</th>
                <th className="font-medium text-[11px]">150%</th>
                <th className="font-medium text-[11px]">200%</th>
                <th className="font-medium text-[11px]">300%</th>
                <th className="font-medium text-[11px]">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>27/10/2025</td>
                <td>8h</td>
                <td>3h</td>
                <td>-</td>
                <td>-</td>
                <td className="text-right font-medium">200.000</td>
              </tr>
              <tr>
                <td>28/10/2025</td>
                <td>8h</td>
                <td>3h</td>
                <td>-</td>
                <td>-</td>
                <td className="text-right font-medium">200.000</td>
              </tr>
              <tr>
                <td>29/10/2025</td>
                <td>8h</td>
                <td>3h</td>
                <td>-</td>
                <td>-</td>
                <td className="text-right font-medium">200.000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Luong_index;
