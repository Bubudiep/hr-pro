// Capnhat_congty.tsx
import { Modal, Form, Input, Select, Button, message } from "antd";
import React, { useState, useEffect, type ReactNode } from "react";
import { FaRegImage, FaTrash } from "react-icons/fa";
import { useAuth } from "../../../../context/authContext";
import Api from "../../../../components/api";
import { bulkDelete, putMultiple } from "../../../../db/App_db";

interface Company {
  id: number;
  logo: string; // URL của logo
  name: string; // Tên ngắn của công ty
  fullname: string; // Tên đầy đủ
  address: string;
  khucongnhiep: number | null; // ID hoặc Tên KCN
}
interface CompanyUpdateData {
  logo?: File | null; // Dùng File cho việc upload mới
  tenCongTy: string; // name
  diaChi: string; // address
  loaiHinh: number | null; // khucongnhiep
}
const Capnhat_congty = ({
  children,
  comp,
}: {
  children: ReactNode;
  comp: Company;
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form] = Form.useForm<CompanyUpdateData>();
  const [logoPreview, setLogoPreview] = useState<string | null>(comp?.logo);
  const { init, user, setInit } = useAuth(); // Giả định user và init có sẵn
  useEffect(() => {
    if (showModal) {
      form.setFieldsValue({
        tenCongTy: comp?.name,
        diaChi: comp?.address,
        loaiHinh: comp?.khucongnhiep || null,
      });
      setLogoPreview(comp.logo);
    }
  }, [showModal, comp, form]);

  const onFinish = (values: CompanyUpdateData) => {
    const formData = new FormData();
    formData.append("name", values.tenCongTy);
    formData.append("address", values.diaChi);
    formData.append("khucongnghiep", values?.loaiHinh?.toString() || "");
    if (values.logo) {
      formData.append("logo", values.logo, values.logo.name);
    }
    Api.patch(`/comp/${comp.id}/`, formData, user?.access_token || "")
      .then((res) => {
        putMultiple("CongTy", [res]);
        setInit((o: any) => ({
          ...o,
          companies: o?.companies?.map((old: any) =>
            old.id === res?.id ? res : old
          ),
        }));
        setShowModal(false);
        setLogoPreview(null);
        form.resetFields();
        message.success(`Đã cập nhật công ty: ${values.tenCongTy}`);
      })
      .catch((e) => {
        Api.error(e);
      });
  };
  const handleDelete = () => {
    Modal.confirm({
      title: "Cảnh báo",
      content:
        "Việc xóa dữ liệu công ty sẽ bao gồm: Bài viết, Bài viết tuyển dụng của công ty này! Xác nhận để đồng ý xóa",
      onOk: () => {
        Api.delete(`/comp/${comp.id}/`, user?.access_token || "")
          .then(() => {
            message.success("Đã xóa!");
            bulkDelete("CongTy", [comp.id]);
            setInit((o: any) => ({
              ...o,
              companies: o?.companies?.filter(
                (old: any) => old.id !== comp?.id
              ),
            }));
          })
          .catch((e) => {
            Api.error(e);
          });
      },
      okText: <div className="text-[red] font-medium">Xác nhận</div>,
      cancelText: "Đóng",
      maskClosable: true,
    });
  };
  const handleCancel = () => {
    setShowModal(false);
    setLogoPreview(comp.logo);
  };
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    let selectedFile: File | null = null;
    if (files && files.length > 0) {
      selectedFile = files[0];
      const fileUrl = URL.createObjectURL(selectedFile);
      setLogoPreview(fileUrl);
    } else {
      setLogoPreview(comp.logo);
    }

    form.setFieldsValue({ logo: selectedFile });
    e.target.value = "";
  };
  const selectOptions =
    init?.ips?.map((i) => ({
      label: i?.name,
      value: i?.id,
    })) || [];
  return (
    <>
      <div onClick={() => setShowModal(true)}>{children}</div>
      <Modal
        open={showModal}
        onCancel={handleCancel}
        footer={null}
        className="no-footer"
      >
        <Form
          form={form}
          name={`update_company_form_${comp.id}`}
          layout="vertical"
          onFinish={onFinish}
          className="mt-2!"
          initialValues={{ logo: null }}
        >
          <Form.Item name="logo" valuePropName="file">
            <Input type="hidden" />
            <label
              className="flex items-center justify-center shadow w-24 h-24 rounded 
              border border-[#0001] mb-1 text-[#999] cursor-pointer overflow-hidden"
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
            name="loaiHinh"
            label="Khu Công Nghiệp"
            rules={[
              { required: true, message: "Vui lòng chọn Khu Công Nghiệp!" },
            ]}
          >
            <Select
              placeholder="Chọn Khu Công Nghiệp..."
              options={selectOptions}
            />
          </Form.Item>
          <Form.Item
            name="diaChi"
            label="Địa Chỉ"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input.TextArea rows={2} placeholder="Địa chỉ..." />
          </Form.Item>
          <Form.Item
            className="btn"
            style={{ marginTop: 24, textAlign: "right" }}
          >
            <Button
              onClick={handleDelete}
              className="mr-auto"
              color="danger"
              variant="solid"
              icon={<FaTrash />}
            ></Button>
            <Button onClick={handleCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              Lưu Thay Đổi
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Capnhat_congty;
