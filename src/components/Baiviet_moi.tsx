import React, { useEffect, useState, type Dispatch } from "react";
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
import { message, Select, Tooltip } from "antd";
import { useAuth } from "../context/authContext";
import Api from "./api";

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
  const MAX_IMAGES = 3;
  const MAX_FILE_SIZE_BYTES = 200 * 1024;
  const [content, setContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = e.target.files;
    if (!files || files.length === 0 || loading) return;
    setLoading(true);
    const filesToProcess = Array.from(files);
    const totalCount = selectedFiles.length + filesToProcess.length;
    if (totalCount > MAX_IMAGES) {
      message.error(`Bạn chỉ có thể chọn tối đa ${MAX_IMAGES} ảnh.`);
      setLoading(false);
      e.target.value = "";
      return;
    }
    const newFiles: SelectedFile[] = [];
    let currentId =
      selectedFiles.length > 0
        ? selectedFiles[selectedFiles.length - 1].id + 1
        : 1;
    for (const file of filesToProcess) {
      if (selectedFiles.length >= MAX_IMAGES) break;
      if (file.size > MAX_FILE_SIZE_BYTES * 10) {
        message.error(`Tệp ảnh "${file.name}" quá lớn.`);
        continue;
      }
      try {
        const compressedFile = await Api.compressImage(file);
        if (compressedFile) {
          console.log(compressedFile);
          const previewUrl = URL.createObjectURL(compressedFile);
          newFiles.push({ id: currentId++, file: compressedFile, previewUrl });
        }
      } catch (error) {
        message.error(
          `Lỗi xử lý ảnh: ${(error as Error).message || "Không thể nén tệp."}`
        );
      }
    }
    setSelectedFiles((prev) => [...prev, ...newFiles]);
    setLoading(false);
    e.target.value = "";
  };
  const handleRemoveImage = (id: number) => {
    const fileToRemove = selectedFiles.find((f) => f.id === id);
    if (fileToRemove) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }
    setSelectedFiles((prev) => prev.filter((file) => file.id !== id));
  };
  const handleDangbai = () => {
    const formData = new FormData();
    formData.append("noidung", content);
    selectedFiles.forEach((file) => {
      formData.append("images", file.file);
    });
    Api.post(`/posts/`, formData, user?.access_token)
      .then((res) => {
        message.success("Bài viết của bạn đã được đăng!");
        setShowModal(false);
      })
      .catch((e) =>
        message.error(e?.response?.data?.detail || "Lỗi xảy ra: " + e)
      );
  };
  return showModal ? (
    <div className="flex flex-col top-0 fixed w-screen h-screen z-99">
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
              value={content}
              onChange={(e) => setContent(e?.target?.value)}
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
              {selectedFiles.length < 3 && (
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
                  />
                </label>
              )}
            </div>
            <div className="flex gap-1 px-4">
              <button
                disabled={content == ""}
                onClick={handleDangbai}
                className="bg-[#07f] text-white p-2 py-1.5 rounded-md shadow active:bg-[#004ba1]"
              >
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
