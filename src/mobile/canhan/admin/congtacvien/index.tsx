import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/authContext";
import { getData } from "../../../../db/App_db";
import { Button } from "antd";
import { TbMoodEmpty } from "react-icons/tb";

const Congtacvien_index = () => {
  const { user, setConfig, init } = useAuth();
  const [animation, setAnimation] = useState({
    bg: "fadeIn",
    card: "fadeInTop",
  });
  const [tin, setTin] = useState<any[]>([]);
  const nav = useNavigate();
  const handleClose = () => {
    setAnimation({ bg: "fadeOut", card: "fadeOutTop" });
    setTimeout(() => nav("/mobile/canhan/"), 300);
    setTimeout(() => setConfig((o: any) => ({ ...o, taskbar: true })), 100);
  };
  useEffect(() => {
    const getTin = async () => {
      const all_tin = await getData("TuyenDung");
      setTin(all_tin);
    };
    getTin();
    setConfig((o: any) => ({ ...o, taskbar: false }));
    setAnimation({
      bg: "fadeIn",
      card: "fadeInTop",
    });
    return () => {
      setConfig((o: any) => ({ ...o, taskbar: true }));
    };
  }, []);
  return user?.profile?.level === "admin" ? (
    <div
      className={`flex absolute overflow-hidden flex-col top-0 left-0 w-screen z-100 h-screen`}
    >
      <div
        onClick={handleClose}
        className={`bg-[#0003] h-full absolute w-full ${animation?.bg}`}
      />
      <div
        className={`h-[calc(100vh-100px)] mt-25  bg-[white] rounded-t-2xl overflow-hidden ${animation.card}`}
      >
        <div className="flex flex-col h-full overflow-hidden flex-1 relative">
          <div className="flex min-h-10 h-10 text-[#2d2d38] items-center gap-4 px-4">
            <div className="flex flex-1">
              <div className="flex gap-2 items-center font-medium">
                Cộng tác viên
              </div>
            </div>
          </div>
          <div className="flex px-4 justify-between">
            <Button type="primary" size="small" className="text-[13px]! p-2!">
              Thêm mới
            </Button>
            <div className="flex gap-1"></div>
          </div>
          <div className="px-4 flex flex-col flex-1 overflow-y-auto">
            {tin?.length === 0 ? (
              <div className="flex flex-1 flex-col text-[#999] gap-2 items-center justify-center">
                <TbMoodEmpty size={32} />
                <div>Chưa có cộng tác viên nào!</div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <div
        className={`flex absolute overflow-hidden flex-col top-0 left-0 w-screen z-100 h-screen`}
      >
        <div
          onClick={handleClose}
          className={`bg-[#0003] h-full absolute w-full ${animation?.bg}`}
        />
        <div
          className={`h-[calc(100vh-100px)] mt-25  bg-[white] rounded-t-2xl overflow-hidden ${animation.card}`}
        >
          <div className="flex flex-1 h-full flex-col text-[#999] gap-2 items-center justify-center">
            <TbMoodEmpty size={32} />
            <div>Không đủ thẩm quyền!</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Congtacvien_index;
