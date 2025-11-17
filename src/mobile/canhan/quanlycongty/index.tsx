import { Button } from "antd";
import React, { useEffect } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import Themmoi_congty from "./themcongty";
import { FaLocationDot } from "react-icons/fa6";
import { RiMore2Fill } from "react-icons/ri";
import { IoIosMore } from "react-icons/io";
import Capnhat_congty from "./suacongty";

const Quanlycongty_index = () => {
  const { user, init } = useAuth();
  useEffect(() => {
    console.log(init);
  }, [init.companies]);
  return (
    <div className="absolute overflow-hidden flex flex-col top-0 left-0 w-screen z-100 bg-white h-screen">
      <div className="flex flex-col flex-1 relative overflow-hidden bg-[#e6e7ed]">
        <div
          className="flex min-h-14 h-14 text-[#2d2d38] items-center gap-4 px-4 
          shadow border-b border-[#0003] bg-[white] fadeInBot"
        >
          <Link to="/mobile/canhan" className="flex flex-1">
            <div className="flex gap-2 items-center">
              <FaArrowLeft /> Quản lý công ty
            </div>
          </Link>
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
        <div className="flex flex-col gap-2 overflow-hidden p-4 pt-2 flex-1 fadeInTop">
          <div className="flex flex-col gap-2 overflow-y-auto h-full pb-22">
            {init?.companies
              ?.sort((a, b) => b?.id - a?.id)
              ?.map((comp) => (
                <Capnhat_congty comp={comp} key={comp?.id}>
                  <div className="flex relative bg-[white] p-2 px-3 gap-3 rounded-xl shadow">
                    <div className="w-14 h-14">
                      <img src={comp?.logo} />
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex w-full font-medium justify-between">
                        {comp?.name}
                        <div
                          className="flex bg-[#125880] text-[white] text-[11px] rounded-md 
                      items-center px-1 py-0.5"
                        >
                          {
                            init?.ips?.find((i) => i?.id === comp?.khucongnhiep)
                              ?.name
                          }
                        </div>
                      </div>
                      <div className="flex text-[12px]">
                        {comp?.fullname || "-"}
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
  );
};

export default Quanlycongty_index;
