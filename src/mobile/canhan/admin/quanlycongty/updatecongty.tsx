import { Form } from "antd";
import React, { useState, type ReactNode } from "react";
import { useAuth } from "../../../../context/authContext";
interface CompanyUpdateData {
  logo?: File | null; // Dùng File cho việc upload mới
  tenCongTy: string; // name
  diaChi: string; // address
  loaiHinh: number | null; // khucongnhiep
}
interface Update_congtyType {
  children: ReactNode;
  comp: {
    id: number;
    logo: string; // URL của logo
    name: string; // Tên ngắn của công ty
    fullname: string; // Tên đầy đủ
    address: string;
    khucongnhiep: number | null; // ID hoặc Tên KCN
  };
}
const Update_congty = ({ children, comp }: Update_congtyType) => {
  console.log(comp);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form] = Form.useForm<CompanyUpdateData>();
  const [logoPreview, setLogoPreview] = useState<string | null>(comp?.logo);
  const { init, user, setInit } = useAuth(); // Giả định user và init có sẵn
  return <div>{children}</div>;
};

export default Update_congty;
