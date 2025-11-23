import {
  Form,
  Modal,
  Input,
  InputNumber,
  Switch,
  Upload,
  Button,
  message,
  Row,
  Col,
  Select,
} from "antd";
import React, { useState, type ReactNode, useEffect } from "react";
import { useAuth } from "../../../../context/authContext"; // Giả sử đường dẫn đúng
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import axios from "axios"; // Cần cài axios nếu chưa có
import TextArea from "antd/es/input/TextArea";
import Api from "../../../../components/api";
import { getData, putMultiple } from "../../../../db/App_db";
import { FaTrash } from "react-icons/fa";

interface Update_congtyType {
  children: ReactNode;
  comp?: {
    id: number;
  };
  tin?: {
    id: number;
    active: boolean;
    title: string;
    images?: string[];
    urgent: boolean;
    hiring: boolean;
    min_old: string | number;
    max_old: string | number;
    noidungbosung: string;
    luongtuan?: boolean;
    phongsach?: boolean;
    cuatu?: boolean;
    thuong?: boolean;
    soluong?: number;
    thuong_sotien?: number;
    thuong_dieukien?: string;
    loaihinh?: number;
    mucluong?: string;
    calamviec?: number;
    luong?: string;
    phucap?: string;
    tienkhac?: string;
    luongcoban?: number;
    chuyencan?: number;
    images_details?: UploadFile[];
  };
  isNew?: boolean;
  className: string;
  onSuccess?: (e: any) => void;
}

const Update_congty = ({
  isNew,
  children,
  className,
  tin,
  comp,
  onSuccess,
}: Update_congtyType) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [form] = Form.useForm();
  const [tags, setTags] = useState<any[]>([]);
  const { user } = useAuth(); // Lấy token nếu cần thiết từ user hoặc auth context
  const openModal = async () => {
    setShowModal(true);
    if (tin) {
      setFileList(tin?.images_details || []);
      form.setFieldsValue({
        active: tin?.active,
        title: tin?.title,
        noidungbosung: tin?.noidungbosung,
        hiring: tin?.hiring,
        urgent: tin?.urgent,
        min_old: Number(tin?.min_old),
        max_old: Number(tin?.max_old),
        luongtuan: tin?.luongtuan,
        phongsach: tin?.phongsach,
        cuatu: tin?.cuatu,
        thuong: tin?.thuong,
        thuong_sotien: tin?.thuong_sotien,
        thuong_dieukien: tin?.thuong_dieukien,
        loaihinh: tin?.loaihinh,
        calamviec: tin?.calamviec,
        mucluong: tin?.mucluong,
        soluong: tin?.soluong,
        luongcoban: tin?.luongcoban,
        chuyencan: tin?.chuyencan,
        luong: tin?.luong,
        phucap: tin?.phucap,
        tienkhac: tin?.tienkhac,
      });
    }
    const qs_tag = await getData("TinTag");
    setTags(qs_tag);
  };
  const closeModal = () => setShowModal(false);
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const handleDelete = () => {
    Modal.confirm({
      title: "Cảnh báo",
      content: "Bài viết tuyển dụng này sẽ bị xóa bỏ?",
      okText: <div className="text-[red]">Xác nhận</div>,
      cancelText: "Đóng",
      onOk: () => {
        Api.delete(`tin/${tin?.id}/`, user?.access_token || "")
          .then(async (res) => {
            console.log(res);
            message.success("Tin tuyển dụng đã được gỡ bỏ!");
            const update = await putMultiple("TuyenDung", [res]);
            onSuccess?.(update);
            closeModal();
            form.resetFields();
          })
          .catch((error: any) => {
            Api.error(error);
          })
          .finally(() => {
            setLoading(false);
          });
      },
    });
  };
  const handleOk = async () => {
    const values = await form.validateFields();
    setLoading(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (values[key] !== undefined && values[key] !== null) {
        formData.append(key, values[key]);
      }
    });
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append("images", file.originFileObj);
      }
    });
    if (isNew) {
      formData.append("companies", `${comp?.id}`);
      Api.post(`tin/`, formData, user?.access_token)
        .then(async (res) => {
          console.log(res);
          message.success("Đăng tin thành công!");
          const update = await putMultiple("TuyenDung", [res]);
          onSuccess?.(update);
          closeModal();
          form.resetFields();
        })
        .catch((error: any) => {
          Api.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      Api.patch(`tin/${tin?.id}/`, formData, user?.access_token || "")
        .then(async (res) => {
          console.log(res);
          message.success("Đăng tin thành công!");
          const update = await putMultiple("TuyenDung", [res]);
          onSuccess?.(update);
          closeModal();
          form.resetFields();
        })
        .catch((error: any) => {
          Api.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const uploadButton = (
    <div className="text-[13px] text-[#999]">
      <PlusOutlined /> Ảnh
    </div>
  );
  const isThuong = Form.useWatch("thuong", form);
  return (
    <>
      <div onClick={openModal} className={`${className} cursor-pointer`}>
        {children}
      </div>
      <Modal
        title={isNew ? "Tin tuyển dụng mới" : "Tuyển dụng"}
        open={showModal}
        onCancel={closeModal}
        onOk={handleOk}
        confirmLoading={loading}
        okText="Lưu lại"
        cancelText="Đóng"
      >
        <Form form={form} layout="vertical" initialValues={{ hiring: true }}>
          <Form.Item
            name="title"
            className="mb-2! -mt-4! text-[16px]"
            rules={[{ required: true, message: "Nhập tiêu đề" }]}
          >
            <Input addonBefore="Vị trí" placeholder="VD: Công nhân - Assy" />
          </Form.Item>
          <Form.Item className="mb-1!">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={() => {}}
              multiple
              onRemove={(e: any) => {
                Modal.confirm({
                  title: "Cảnh báo",
                  content: "Xác nhận xóa ảnh?",
                  okText: "Xóa",
                  cancelText: "Đóng",
                  onOk: () => {
                    Api.post(
                      `tin/${tin?.id}/remove_image/`,
                      { id: e?.uid },
                      user?.access_token
                    ).then(async (res) => {
                      const update = await putMultiple("TuyenDung", [res]);
                      onSuccess?.(update);
                      message.success("Đã xóa ảnh!");
                      setFileList(res?.images_details);
                    });
                  },
                });
              }}
              onChange={handleChange}
              beforeUpload={() => false} // Quan trọng: Chặn auto upload của Antd
              maxCount={4}
              accept="image/*"
            >
              {fileList.length >= 4 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item name="active" className="mb-1!" valuePropName="checked">
            <Switch
              className="w-[120px]"
              checkedChildren="Đang tuyển"
              unCheckedChildren="Dừng tuyển"
            />
          </Form.Item>
          <Form.Item name="urgent" className="mb-1!" valuePropName="checked">
            <Switch
              className="w-[120px]"
              checkedChildren="Cần gấp"
              unCheckedChildren="Không cần gấp"
            />
          </Form.Item>
          <Form.Item name="luongtuan" className="mb-1!" valuePropName="checked">
            <Switch
              className="w-[120px]"
              checkedChildren="Lương tuần"
              unCheckedChildren="Lương tháng"
            />
          </Form.Item>
          <Form.Item name="phongsach" className="mb-1!" valuePropName="checked">
            <Switch
              className="w-[120px]"
              checkedChildren="Phòng sạch"
              unCheckedChildren="Phòng thường"
            />
          </Form.Item>
          <Form.Item name="cuatu" className="mb-1!" valuePropName="checked">
            <Switch
              className="w-[120px]"
              checkedChildren="Có cửa từ"
              unCheckedChildren="Không cửa từ"
            />
          </Form.Item>
          <Form.Item name="thuong" className="mb-1!" valuePropName="checked">
            <Switch
              className="w-[120px]"
              checkedChildren="Có hưởng"
              unCheckedChildren="Không thưởng"
            />
          </Form.Item>
          {isThuong && (
            <div
              className="border border-dashed bg-[#f5f5f5] border-[#d9d9d9]
              rounded-md p-2 mb-2"
            >
              <Form.Item
                name="thuong_sotien"
                label="Tiền thưởng"
                rules={[{ required: true, message: "Nhập tiền" }]}
                className="mb-0!"
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                  placeholder="VD: 500,000"
                />
              </Form.Item>
              <Form.Item
                name="thuong_dieukien"
                label="Điều kiện"
                className="mb-0!"
              >
                <TextArea rows={2} placeholder="VD: Làm đủ 26 công" />
              </Form.Item>
            </div>
          )}
          <Form.Item name="tags" className="mb-2!">
            <Select
              placeholder="Thêm tags"
              allowClear
              mode="multiple"
              options={tags.map((item) => ({
                value: item?.id,
                label: item?.name,
              }))}
            ></Select>
          </Form.Item>
          <Form.Item name="loaihinh" className="mb-2!">
            <Select placeholder="Thời vụ hoặc chính thức">
              <Select.Option value="tv">Thời vụ</Select.Option>
              <Select.Option value="ct">Chính thức</Select.Option>
              <Select.Option value="all">Thời vụ và chính thức</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="calamviec" className="mb-2!">
            <Select placeholder="Ca làm việc">
              <Select.Option value="2ca">Ca ngày + Ca đêm</Select.Option>
              <Select.Option value="hc">Hành chính</Select.Option>
              <Select.Option value="lh">Linh hoạt</Select.Option>
              <Select.Option value="3ca">Ba ca</Select.Option>
            </Select>
          </Form.Item>
          <div className="flex gap-2">
            <Form.Item name="min_old" className="mb-2!">
              <InputNumber
                addonBefore="Tuổi từ"
                style={{ width: "100%" }}
                min={10}
                max={60}
              />
            </Form.Item>
            <Form.Item name="max_old" className="mb-2!">
              <InputNumber
                addonBefore="đến"
                style={{ width: "100%" }}
                min={10}
                max={60}
              />
            </Form.Item>
          </div>
          <Form.Item name="soluong" className="mb-2!">
            <InputNumber
              addonBefore="Số lượng"
              style={{ width: "100%" }}
              min={1}
              max={10000}
              placeholder="bỏ trống là không giới hạn..."
            />
          </Form.Item>
          <Form.Item name="mucluong" className="mb-2!">
            <Input
              addonBefore={<div className="w-22">Lương dự tính</div>}
              style={{ width: "100%" }}
              min={1}
              max={10000000000}
              placeholder="VD: Từ 10-12tr"
            />
          </Form.Item>
          <Form.Item name="luongcoban" className="mb-2!">
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
              placeholder="VD: 500,000"
              className="w-full!"
              addonBefore={<div className="w-22">Lương cơ bản</div>}
              addonAfter="VNĐ"
            />
          </Form.Item>
          <Form.Item name="phucap" className="mb-2!">
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
              placeholder="VD: 500,000"
              className="w-full!"
              addonBefore={<div className="w-22">Tiền phụ cấp</div>}
              addonAfter="VNĐ"
            />
          </Form.Item>
          <Form.Item name="chuyencan" className="mb-2!">
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
              placeholder="VD: 500,000"
              className="w-full!"
              addonBefore={<div className="w-22">Chuyên cần</div>}
              addonAfter="VNĐ"
            />
          </Form.Item>
          <Form.Item name="noidungbosung">
            <Input.TextArea rows={4} placeholder="Mô tả thêm về công việc..." />
          </Form.Item>
        </Form>
        <Button
          color="danger"
          onClick={handleDelete}
          variant="outlined"
          icon={<FaTrash />}
        >
          Xóa
        </Button>
      </Modal>
    </>
  );
};

export default Update_congty;
