import React, { type ReactNode } from "react";

const Spark = ({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) => {
  return (
    <div className={`spark-nav relative ${active ? "active" : "deactive"}`}>
      {children}
      <div className={`absolute top-[50%] left-[50%]`}>
        <div className="spark spark-1"></div>
        <div className="spark spark-2"></div>
        <div className="spark spark-3"></div>
        <div className="spark spark-4"></div>
      </div>
    </div>
  );
};

export default Spark;
