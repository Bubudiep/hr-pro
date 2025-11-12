import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/authContext";

const isMobileDevice = (): boolean => {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};
const App_home: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = isMobileDevice();
  useEffect(() => {
    if (isMobile) {
      navigate(`mobile`, {
        replace: true,
      });
    }
  }, [isMobile, location, navigate]);
  return (
    <div className="flex flex-col fixed top-0 left-0 w-full h-full items-center justify-center">
      <Spin />
    </div>
  );
};

export default App_home;
