import React, { useEffect, useState } from "react";
import News_index from "./news";
import Luong_index from "./luong";
import BottomTaskbar from "./taskbar";
import Lichtuyen_index from "./lichtuyen";
import Cong_index from "./cong";
import Canhan_index from "./canhan";
import { useNavigate, useParams } from "react-router-dom";
const tabOrder = ["cong", "luong", "news", "lichtuyen", "canhan"];
const Mobile_index = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tab || "news");
  useEffect(() => {
    if (tab && activeTab !== tab) {
      setActiveTab(tab);
    }
  }, [tab]);
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    navigate(`/mobile/${newTab}`);
  };
  const activeTabIndex = tabOrder.indexOf(activeTab);
  return (
    <>
      <div className="tab-slider-container">
        <div
          className="tab-content-wrapper"
          style={{
            transform: `translateX(-${activeTabIndex * 20}%)`,
            transition: "all 0.3s ease-in-out",
          }}
        >
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
