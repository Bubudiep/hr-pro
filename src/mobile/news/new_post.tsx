import { FaImage, FaUser } from "react-icons/fa";
import Baiviet_moi from "../../components/Baiviet_moi";
import { useState } from "react";
const New_post = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Baiviet_moi showModal={showModal} setShowModal={setShowModal} />
      <div className="flex flex-col mb-2" onClick={() => setShowModal(true)}>
        <div className="flex items-center bg-white shadow p-2 gap-2">
          <div className="avatar">
            <div
              className="flex w-10 items-center justify-center text-white
            h-10 bg-[#5d7896] rounded-full border border-[#272b30]"
            >
              <FaUser />
            </div>
          </div>
          <div
            className="text-[13px] mr-2 bg-[#ebf1f8] w-full rounded-md py-1.5 p-2 border
         border-[#3a5370] text-[#272b30] ml-0.5"
          >
            Tạo bài viết mới!
          </div>
          <div className="flex ml-auto mr-2 text-[#272b30]">
            <FaImage size={20} />
          </div>
        </div>
      </div>
    </>
  );
};
export default New_post;
