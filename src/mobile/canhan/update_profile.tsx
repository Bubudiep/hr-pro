import React, { type ReactNode, useState } from "react";
import { Modal, Form, Input, Button, message } from "antd"; // Import từ Ant Design
import { useAuth } from "../../context/authContext";
import Api from "../../components/api";

interface UpdateProfileType {
  children: ReactNode;
}

const UpdateProfile = ({ children }: UpdateProfileType) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { user, setUser, updateProfile } = useAuth();
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleSave = async () => {
    const values = await form.getFieldsValue();
    setConfirmLoading(true);
    console.log("Update", values);
    Api.patch(`profile/${user?.profile?.id}/`, values, user?.access_token || "")
      .then((res) => {
        message.success("Thành công!");
        setIsModalVisible(false);
        setUser((o: any) =>
          o
            ? {
                ...(o || {}),
                profile: res,
              }
            : undefined
        );
      })
      .catch((e) => Api.error(e))
      .finally(() => setConfirmLoading(false));
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  return (
    <>
      <div onClick={showModal}>{children}</div>
      <Modal
        title="Hồ sơ"
        onOk={handleSave}
        open={isModalVisible}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        okText="Lưu"
        cancelText="Đóng"
      >
        <Form
          form={form}
          name="update-profile-form"
          initialValues={{
            name: user?.profile?.name,
            name_display: user?.profile?.name_display,
            phone: user?.profile?.phone,
            cccd: user?.profile?.cccd,
          }}
          className="-my-2!"
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Tên đầy đủ"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng!" },
            ]}
            className="mb-1!"
          >
            <Input placeholder="tên hồ sơ..." />
          </Form.Item>
          <Form.Item name="name_display" label="Tên hiển thị" className="mb-1!">
            <Input placeholder="tên hiển thị..." />
          </Form.Item>
          <Form.Item name="phone" label="Số Điện Thoại" className="mb-1!">
            <Input placeholder="điện thoại liên hệ..." />
          </Form.Item>
          <Form.Item name="cccd" label="Số CCCD/ĐDCN" className="mb-1!">
            <Input placeholder="để xác minh lúc phỏng vấn..." />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProfile;
