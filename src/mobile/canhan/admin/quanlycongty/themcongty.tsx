import {
  Modal,
  Form,
  Input,
  Upload,
  Select,
  Button,
  message,
  type UploadProps,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState, type ReactNode } from "react";
import type { UploadFile } from "antd/lib/upload/interface";
import { useAuth } from "../../../../context/authContext";
import { FaRegImage } from "react-icons/fa";
import Api from "../../../../components/api";
import { putMultiple } from "../../../../db/App_db";

// Định nghĩa kiểu dữ liệu cho dữ liệu công ty
interface CompanyData {
  logo?: File | null;
  tenCongTy: string;
  diaChi: string;
  ips: string;
}
const Themmoi_congty = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { init, user, setInit } = useAuth();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const onFinish = (values: CompanyData) => {
    const formData = new FormData();
    formData.append("name", values.tenCongTy);
    formData.append("address", values.diaChi);
    formData.append("khucongnhiep", values.ips);
    if (values.logo) {
      const file = values.logo;
      if (file) {
        formData.append("logo", file, file.name);
      }
    }
    Api.post("/comp/", formData, user?.access_token).then((res) => {
      putMultiple("CongTy", [res]);
      setInit((o: any) => ({
        ...o,
        companies: [...(o?.companies || []), res],
      }));
      message.success(`Đã thêm công ty: ${values.tenCongTy}`);
      setShowModal(false);
      setLogoPreview(null);
      form.resetFields();
    });
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    let selectedFile: File | null = null;
    if (files && files.length > 0) {
      selectedFile = files[0];
      const fileUrl = URL.createObjectURL(selectedFile);
      setLogoPreview(fileUrl);
    } else {
      setLogoPreview(null);
    }
    form.setFieldsValue({ logo: selectedFile });
    e.target.value = "";
  };
  return (
    <>
      <div onClick={() => setShowModal(true)}>{children}</div>
      <Modal
        title="Thêm mới công ty"
        open={showModal}
        onCancel={handleCancel}
        footer={null}
        className="no-footer"
      >
        <Form
          form={form}
          name="company_form"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="logo"
            rules={[{ required: true, message: "Vui lòng chọn logo công ty!" }]}
          >
            <Input type="hidden" />
            <label
              className="flex items-center justify-center w-24 h-24 rounded 
              border border-[#0001] shadow mb-4 text-[#999] cursor-pointer overflow-hidden"
              style={{
                backgroundImage: logoPreview ? `url(${logoPreview})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!logoPreview && <FaRegImage size={32} />}
              <input
                type="file"
                className="hidden!"
                accept=".png,.jpg,.jpeg,.ico,.webp"
                onChange={handleLogoChange}
              />
            </label>
          </Form.Item>
          <Form.Item
            name="tenCongTy"
            label="Tên Công Ty"
            rules={[{ required: true, message: "Vui lòng nhập tên công ty!" }]}
          >
            <Input placeholder="Ví dụ: Công ty TNHH A.B.C" />
          </Form.Item>
          <Form.Item
            name="diaChi"
            label="Địa Chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input.TextArea
              rows={2}
              placeholder="Ví dụ: 123 Đường XYZ, Quận 1, TP.HCM"
            />
          </Form.Item>
          <Form.Item
            name="ips"
            label="Khu công nghiệp"
            rules={[
              { required: true, message: "Vui lòng chọn khu công nghiệp!" },
            ]}
          >
            <Select
              placeholder="Khu công nghiệp..."
              options={init?.ips?.map((i) => ({
                label: i?.name,
                value: i?.id,
              }))}
            ></Select>
          </Form.Item>
          <div className="mt-1 mb-1">Hình thức</div>
          <Form.Item name="tenCongTy">
            <Select
              placeholder="thường xuyên/ngắn hạn"
              options={["Thường xuyên", "Ngắn hạn"].map((e) => ({
                label: e,
                value: e,
              }))}
            />
          </Form.Item>
          <Form.Item name="tenCongTy">
            <Select
              placeholder="chính thức/thời vụ"
              options={["Chính thức", "Thời vụ"].map((e) => ({
                label: e,
                value: e,
              }))}
            />
          </Form.Item>
          <Form.Item className="btn">
            <Button onClick={handleCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              Lưu Công Ty
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Themmoi_congty;
