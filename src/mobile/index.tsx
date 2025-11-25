import React, { useEffect, useState } from "react";
import News_index from "./news";
import Luong_index from "./luong";
import BottomTaskbar from "./taskbar";
import Lichtuyen_index from "./lichtuyen";
import Cong_index from "./cong";
import Canhan_index from "./canhan";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Spin } from "antd";
import Api from "../components/api";
import { getData } from "../db/App_db";
const tabOrder = ["cong", "luong", "news", "lichtuyen", "canhan"];
const Mobile_index = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const { auto_login, loading } = useAuth();
  const [showLoad, setShowload] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState(tab || "news");
  const { user, setInit } = useAuth();
  useEffect(() => {
    if (tab && activeTab !== tab) {
      setActiveTab(tab);
    }
  }, [tab]);
  useEffect(() => {
    if (loading) {
      setShowload(true);
    } else {
      setTimeout(() => {
        setShowload(false);
      }, 500);
    }
  }, [loading]);
  useEffect(() => {
    const autoLogin = async () => {
      await auto_login((e: boolean) => {
        if (e === false) {
          console.log("Tự động đăng nhập không thành công!");
        } else {
          console.log("Tự động đăng nhập thành công!");
        }
      });
      const qs_ips = await getData("KhuCongNghiep");
      const qs_comp = await getData("CongTy");
      const qs_tag = await getData("TinTag");
      setInit({ companies: qs_comp, ips: qs_ips, tags: qs_tag });
    };
    autoLogin();
  }, []);
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    navigate(`/mobile/${newTab}`);
  };
  const activeTabIndex = tabOrder.indexOf(activeTab);
  return (
    <>
      {showLoad && (
        <div
          className={`flex flex-col gap-1 fixed w-screen h-screen bg-[white] 
          z-101 items-center justify-center ${!loading ? "fadeOut" : ""}`}
        >
          <div className="loader" />
        </div>
      )}
      <div className="tab-slider-container">
        <div
          className="tab-content-wrapper"
          style={{
            transform: `translateX(-${activeTabIndex * 20}%)`,
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Outlet />
          <Cong_index />
          <Luong_index />
          <News_index />
          <Lichtuyen_index />
          <Canhan_index />
        </div>
        <BottomTaskbar activeTab={activeTab} setActiveTab={handleTabChange} />
      </div>
    </>
  );
};

export default Mobile_index;
