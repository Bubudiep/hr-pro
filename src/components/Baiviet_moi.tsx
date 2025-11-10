import React, { useEffect, useState, type Dispatch } from "react";
import { useUser } from "../context/userContext";
import { FaCircleCheck, FaXmark } from "react-icons/fa6";
import {
  BiImageAdd,
  BiMessageSquareAdd,
  BiSolidCheckSquare,
} from "react-icons/bi";
import { FaTimesCircle } from "react-icons/fa";
import { LuSquare, LuSquareCheckBig } from "react-icons/lu";
import {
  TbHelpCircleFilled,
  TbSquare,
  TbSquareCheckFilled,
} from "react-icons/tb";
import { Select, Tooltip } from "antd";

interface SelectedFile {
  id: number;
  file: File;
  previewUrl: string;
}
const Baiviet_moi = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { updateConfig } = useUser();
  const [checkbox, setCheckbox] = useState({
    tuyendung: false,
    quangba: false,
  });
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  useEffect(() => {
    updateConfig({ taskbar: !showModal });
  }, [showModal]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const totalCount = selectedFiles.length + files.length;
    const MAX_IMAGES = 3;
    if (totalCount > MAX_IMAGES) {
      alert(`Bạn chỉ có thể chọn tối đa ${MAX_IMAGES} ảnh.`);
      return;
    }
    const newFiles: SelectedFile[] = [];
    let currentId =
      selectedFiles.length > 0
        ? selectedFiles[selectedFiles.length - 1].id + 1
        : 1;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const previewUrl = URL.createObjectURL(file); // Tạo URL tạm thời cho preview
      newFiles.push({ id: currentId++, file, previewUrl });
    }
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };
  const handleRemoveImage = (id: number) => {
    const fileToRemove = selectedFiles.find((f) => f.id === id);
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    setSelectedFiles((prev) => prev.filter((file) => file.id !== id));
  };
  return showModal ? (
    <div className="flex flex-col fixed w-screen h-screen z-99">
      <div className="flex relative flex-col bg-white w-full h-full z-1 mt-auto">
        <div
          className="text-[13px] pl-4.5 w-full 
          font-medium text-[#174170] flex gap-2 items-center h-14 shadow"
        >
          <div className="w-full flex gap-2 items-center">
            <BiMessageSquareAdd size={20} />
            Bài viết mới
          </div>
          <div
            className="text-[#0006] w-14 h-full flex items-center justify-center"
            onClick={() => setShowModal(false)}
          >
            {<FaXmark size={18} />}
          </div>
        </div>
        <div className="flex flex-col fadeInTop gap-1">
          <div className="border-b border-[#0002] mb-2">
            <textarea
              className="border-none w-full p-2 px-4 outline-none h-60"
              placeholder="Viết gì đó...."
            />
          </div>
          <div className="flex flex-col gap-2 mt-1">
            <div className="flex px-4 gap-2">
              {selectedFiles.length > 0 && (
                <div className="flex gap-2">
                  {selectedFiles.map((file) => (
                    <div key={file.id} className="flex relative w-12 h-12">
                      <img
                        src={file.previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-md border border-gray-200 overflow-hidden"
                      />
                      <button
                        onClick={() => handleRemoveImage(file.id)}
                        className="absolute -top-2 -right-2 text-red-500 bg-white rounded-full p-0.5 shadow-md"
                      >
                        <FaTimesCircle size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <label
                className="items-center justify-center flex relative w-12 h-12 rounded-md 
              border border-gray-200"
              >
                <div className="text">
                  <BiImageAdd size={18} className="text-[#999]" />
                </div>
                <input
                  id="image-upload-input"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  disabled={selectedFiles.length >= 3}
                />
              </label>
            </div>
            <div className="flex flex-col gap-1.5 py-1 px-4 text-[#999]">
              <div className="flex items-center">
                <label
                  className={`flex gap-1 items-center ${
                    checkbox?.tuyendung ? "text-[#07f] font-medium" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={checkbox.tuyendung}
                    onChange={() =>
                      setCheckbox((o) => ({
                        ...o,
                        tuyendung: !o.tuyendung,
                      }))
                    }
                  />
                  {checkbox?.tuyendung ? (
                    <TbSquareCheckFilled size={16} />
                  ) : (
                    <TbSquare size={16} />
                  )}
                  Ghim bài viết
                </label>
                <Tooltip
                  trigger="click"
                  placement="left"
                  color="white"
                  title={
                    <div className="text-black">
                      Bài viết sẽ được ghim lên tường của <b>Doanh nghiệp</b>
                    </div>
                  }
                >
                  <div className="ml-auto text-[16px]">
                    <TbHelpCircleFilled />
                  </div>
                </Tooltip>
              </div>
              <div className="flex justify-between items-center">
                <label
                  className={`flex gap-1 items-center ${
                    checkbox?.quangba ? "text-[#07f] font-medium" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={checkbox.quangba}
                    onChange={() =>
                      setCheckbox((o) => ({
                        ...o,
                        quangba: !o.quangba,
                      }))
                    }
                  />
                  {checkbox?.quangba ? (
                    <TbSquareCheckFilled size={16} />
                  ) : (
                    <TbSquare size={16} />
                  )}
                  Quảng bá bài viết
                </label>
                <Tooltip
                  trigger="click"
                  placement="left"
                  color="white"
                  title={
                    <div className="text-black">
                      Bài viết sẽ được chạy quảng cáo
                    </div>
                  }
                >
                  <div className="ml-auto text-[16px]">
                    <TbHelpCircleFilled />
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className="flex gap-1 px-4">
              <button className="bg-[#07f] text-white p-2 py-1.5 rounded-md shadow">
                Đăng bài viết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Baiviet_moi;
