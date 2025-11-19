import React, { type ReactNode, useState } from "react";
import { Modal, Form, Input, Button } from "antd"; // Import từ Ant Design
import { useAuth } from "../../context/authContext";

interface UpdateProfileType {
  children: ReactNode;
}

const UpdateProfile = ({ children }: UpdateProfileType) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { user, updateProfile } = useAuth();
  const showModal = () => {
    setIsModalVisible(true);
  };
  const onFinish = (values: any) => {
    console.log("Dữ liệu cập nhật:", values);
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <div onClick={showModal}>{children}</div>
      <Modal
        title="Cập nhập hồ sơ"
        open={isModalVisible}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Đóng"
      >
        <Form
          form={form}
          name="update-profile-form"
          initialValues={{
            username: user?.profile?.name,
            name_display: user?.profile?.name_display,
            phone: user?.profile?.phone,
            cccd: user?.profile?.cccd,
          }}
          onFinish={onFinish}
          className="-my-2!"
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Tên đầy đủ"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng!" },
            ]}
            className="mb-1!"
          >
            <Input placeholder="tên nộp hồ sơ..." />
          </Form.Item>
          <Form.Item name="name_display" label="Tên hiển thị" className="mb-1!">
            <Input placeholder="tên hiển thị..." />
          </Form.Item>
          <Form.Item name="phone" label="Số Điện Thoại" className="mb-1!">
            <Input placeholder="điện thoại liên hệ..." />
          </Form.Item>
          <Form.Item name="cccd" label="Số định danh cá nhân" className="mb-1!">
            <Input placeholder="để xác minh lúc phỏng vấn..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProfile;
