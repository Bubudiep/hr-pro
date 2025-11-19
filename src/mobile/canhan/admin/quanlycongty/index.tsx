import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/authContext";
import Themmoi_congty from "./themcongty";
import { FaLocationDot } from "react-icons/fa6";
import { RiMore2Fill } from "react-icons/ri";
import { IoIosMore } from "react-icons/io";
import Capnhat_congty from "./suacongty";

const Quanlycongty_index = () => {
  const { user, setConfig, init } = useAuth();
  const [animation, setAnimation] = useState({
    bg: "fadeIn",
    card: "fadeInTop",
  });
  const nav = useNavigate();
  const handleClose = () => {
    setAnimation({ bg: "fadeOut", card: "fadeOutTop" });
    setTimeout(() => nav("/mobile/canhan/"), 300);
    setTimeout(() => setConfig((o: any) => ({ ...o, taskbar: true })), 100);
  };
  useEffect(() => {
    setConfig((o: any) => ({ ...o, taskbar: false }));
    setAnimation({
      bg: "fadeIn",
      card: "fadeInTop",
    });
    return () => {
      setConfig((o: any) => ({ ...o, taskbar: true }));
    };
  }, []);
  return (
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
        <div className="flex flex-col flex-1 relative overflow-hidden">
          <div className="flex min-h-14 h-14 text-[#2d2d38] items-center gap-4 px-4">
            <div className="flex flex-1">
              <div className="flex gap-2 items-center font-medium">
                Quản lý công ty
              </div>
            </div>
            {user?.profile?.level === "admin" && (
              <div className="ml-auto">
                <Themmoi_congty>
                  <Button
                    icon={<FaPlus />}
                    type="primary"
                    className="border! border-[white]! rounded-full!"
                  ></Button>
                </Themmoi_congty>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 overflow-hidden p-4 pt-2 flex-1">
            <div className="flex flex-col gap-2 overflow-y-auto h-full pb-22">
              {init?.companies
                ?.filter((c) => c?.soft_delete !== true)
                ?.sort((a, b) => b?.id - a?.id)
                ?.map((comp) => (
                  <Capnhat_congty comp={comp} key={comp?.id}>
                    <div className="flex gap-4 relative border-b py-2 border-[#cacaca]">
                      <div className="w-10 h-10">
                        <img src={comp?.logo} />
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex w-full font-medium justify-between">
                          <div className="flex">{comp?.name}</div>
                          <div
                            className="flex bg-[#125880] text-[white] text-[11px] rounded-md 
                            items-center px-1 py-0.5 mt-auto"
                          >
                            {
                              init?.ips?.find(
                                (i) => i?.id === comp?.khucongnhiep
                              )?.name
                            }
                          </div>
                        </div>
                        <div className="flex gap-1 flex-wrap items-center text-[12px] text-[#999]">
                          <FaLocationDot />
                          {comp?.address}
                        </div>
                      </div>
                    </div>
                  </Capnhat_congty>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quanlycongty_index;
