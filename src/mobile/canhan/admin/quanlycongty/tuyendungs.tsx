import { Button, message, Modal } from "antd";
import React, { useEffect, useState, type ReactNode } from "react";
import { FaDotCircle, FaPlus } from "react-icons/fa";
import Update_congty from "./updatecongty";
import { getData } from "../../../../db/App_db";
import { LuCircleDot } from "react-icons/lu";
import { RiCopperCoinFill, RiRadioButtonLine } from "react-icons/ri";
import { BsLightningChargeFill } from "react-icons/bs";
import { IoIosAlarm } from "react-icons/io";
import { MdMeetingRoom } from "react-icons/md";
import { GiDoorHandle } from "react-icons/gi";

interface Company {
  id: number;
  logo: string; // URL của logo
  name: string; // Tên ngắn của công ty
  fullname: string; // Tên đầy đủ
  address: string;
  khucongnhiep: number | null; // ID hoặc Tên KCN
  images?: string[];
  hiring: boolean;
  min_tuoi: string | number;
  max_tuoi: string | number;
  mota: string;
  luongtuan?: boolean;
  phongsach?: boolean;
  cuatu?: boolean;
  thuong?: boolean;
  tien_thuong?: number;
  dieu_kien_thuong?: string;
  loaiHinh?: number;
  ca?: number;
  luong?: string;
  phucap?: string;
  tienkhac?: string;
}
const Danhsach_tuyendung = ({
  children,
  comp,
  callback,
}: {
  children: ReactNode;
  comp: Company;
  callback?: (e: any) => void;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [tins, setTins] = useState<any[]>([]);
  useEffect(() => {
    const fetchCompanyTin = async () => {
      const listTin = await getData("TuyenDung");
      setTins(
        listTin?.filter(
          (tin: any) =>
            tin?.companies === comp?.id && tin?.soft_delete === false
        )
      );
    };
    fetchCompanyTin();
  }, [comp]);
  const handleSuccess = async (e: any[]) => {
    setTins((old) =>
      old
        .map((ti) => {
          const find = e?.find((newtin) => newtin.id === ti.id);
          if (find) return find;
          return ti;
        })
        ?.filter((tin) => tin?.soft_delete === false)
    );
    callback?.(e);
  };
  return (
    <>
      <div onClick={() => setShowModal(true)}>{children}</div>
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => {
          message.success("Đã lưu");
          setShowModal(false);
        }}
        title="Tin tuyển dụng"
        okText="Lưu"
        cancelText="Đóng"
      >
        <div className="flex flex-col -my-4! gap-2">
          <div className="flex gap-1">
            <div
              className="flex flex-1 flex-col shadow rounded bg-[#2b6397]
              px-3 pt-3 text-[white]"
            >
              <div className="text-[12px] leading-2">Đang tuyển</div>
              <div className="text-[24px] font-medium text-right">
                {tins?.filter((t) => t?.active === true)?.length}
              </div>
            </div>
            <div
              className="flex flex-1 flex-col shadow rounded bg-[#57526e]
              px-3 pt-3 text-[white]"
            >
              <div className="text-[12px] leading-2">Dừng tuyển</div>
              <div className="text-[24px] font-medium text-right">
                {tins?.filter((t) => t?.active === false)?.length}
              </div>
            </div>
          </div>
          {comp && (
            <Update_congty
              isNew={true}
              className="w-full sticky -top-4 bg-white pb-1 z-10"
              comp={comp}
              onSuccess={handleSuccess}
            >
              <Button className="w-full" type="primary" icon={<FaPlus />}>
                Đăng tin tuyển dụng mới
              </Button>
            </Update_congty>
          )}
          <div className="flex flex-col gap-2">
            {tins?.length > 0 ? (
              <>
                {tins
                  ?.sort((a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0))
                  ?.sort((a, b) => b.id - a.id)
                  ?.map((tin) => (
                    <Update_congty
                      tin={tin}
                      className={`flex text-[13px] flex-col border border-[#0002] text-[#1a1919] rounded p-1
                        ${
                          tin?.active
                            ? "border-[#07f] text-[#0050ac]! bg-[#f4fbff]"
                            : "text-[#727272]"
                        } relative`}
                      comp={comp}
                      key={tin?.id}
                      onSuccess={handleSuccess}
                    >
                      {tin?.active && (
                        <div
                          className="absolute right-0 top-0 bg-[#07f] text-[10px] font-medium
                          px-1 text-[white] py-0.5 gap-1 rounded-bl-md flex items-center"
                        >
                          <RiRadioButtonLine size={14} />
                        </div>
                      )}
                      <div className="font-medium">
                        {tin?.title || "Chưa có tên"}
                      </div>
                      <div className="text-[10px]">{tin?.code || "-"}</div>
                      <div className="flex gap-1 text-[10px] flex-wrap mt-0.5">
                        {tin?.urgent ? (
                          <div
                            className="flex font-medium text-[white] bg-[#ec0800] 
                            px-1 rounded py-0.5 gap-1 items-center"
                          >
                            <BsLightningChargeFill />
                            Gấp
                          </div>
                        ) : (
                          <></>
                        )}
                        {tin?.thuong ? (
                          <div
                            className="flex text-[10px] font-medium text-[white] bg-[#e66801] 
                            px-1 rounded py-0.5 items-center gap-1"
                          >
                            <RiCopperCoinFill />
                            Thưởng
                          </div>
                        ) : (
                          <></>
                        )}
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
                        ) : tin?.active ? (
                          <>
                            <div
                              className="flex text-[10px] font-medium text-[white] bg-[#096ad1] 
                            px-1 rounded py-0.5 items-center gap-1"
                            >
                              <MdMeetingRoom />
                              Phòng thường
                            </div>
                          </>
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
                        ) : tin?.active ? (
                          <>
                            <div
                              className="flex text-[10px] font-medium text-[white] bg-[#308bec] 
                            px-1 rounded py-0.5 items-center gap-1"
                            >
                              <GiDoorHandle />
                              Không cửa từ
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    </Update_congty>
                  ))}
              </>
            ) : (
              <div
                className="flex p-2 text-[#999] items-center justify-center
              pb-4"
              >
                Chưa có tin tuyển dụng nào!
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Danhsach_tuyendung;
