import React, { useEffect } from "react";
import { useUser } from "../context/userContext";
import { useAuth } from "../context/authContext";
import BottomTaskbar from "./taskbar";
import { Outlet } from "react-router-dom";

const Mobile_index = () => {
  const { user } = useAuth();
  const { profile } = useUser();
  useEffect(() => {
    console.log(user, profile);
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <Outlet />
      </div>
      <BottomTaskbar />
    </>
  );
};

export default Mobile_index;
