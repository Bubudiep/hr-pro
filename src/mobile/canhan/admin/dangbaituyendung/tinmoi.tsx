import { Form, Input, Modal, Select } from "antd";
import React, { useState, type ReactNode } from "react";
interface TintuyendungType {
  children: ReactNode;
}
const Dang_tinmoi = ({ children }: TintuyendungType) => {
  const [showModal, setShowModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async () => {
    const value = await form.getFieldsValue();
    console.log(value);
  };
  return (
    <>
      <div onClick={() => setShowModal(true)}>{children}</div>
      <Modal
        title="Tin tuyển dụng"
        open={showModal}
        onCancel={() => setShowModal(false)}
        confirmLoading={confirmLoading}
        onOk={onFinish}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="company"
            className="mb-1!"
            rules={[{ required: true, message: "Vui lòng chọn công ty!" }]}
          >
            <Select placeholder="Tuyển cho công ty..." />
          </Form.Item>
          <Form.Item
            name="bophan"
            className="mb-1!"
            rules={[{ required: true, message: "Vui lòng chọn công ty!" }]}
          >
            <Input placeholder="Bộ phận..." />
          </Form.Item>
          <Form.Item
            name="vitri"
            className="mb-1!"
            rules={[{ required: true, message: "Vui lòng chọn công ty!" }]}
          >
            <Input placeholder="Vị trí..." />
          </Form.Item>
          <div className="flex gap-1 items-center">
            <div className="flex text-nowrap">Tuổi</div>
            <Form.Item
              name="vitri"
              className="mb-1!"
              rules={[{ required: true, message: "Vui lòng chọn công ty!" }]}
            >
              <Input type="number" placeholder="18" />
            </Form.Item>
            <Form.Item
              name="vitri"
              className="mb-1!"
              rules={[{ required: true, message: "Vui lòng chọn công ty!" }]}
            >
              <Input type="number" placeholder="50" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Dang_tinmoi;
