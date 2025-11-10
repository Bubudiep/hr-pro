import { FaImage, FaPlus, FaUser } from "react-icons/fa";
import Baiviet_moi from "../../components/Baiviet_moi";
import { useState } from "react";
import { BiMessageSquareAdd } from "react-icons/bi";
const New_post = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Baiviet_moi showModal={showModal} setShowModal={setShowModal} />
      <div className="flex flex-col mb-2" onClick={() => setShowModal(true)}>
        <div className="flex h-[54] items-center bg-white shadow p-2 gap-2">
          <div
            className="text-[13px] mr-2 w-full rounded-md py-1.5 p-2
            ml-0.5 font-medium text-[#174170] flex gap-2 items-center"
          >
            <BiMessageSquareAdd size={20} />
            Bài viết mới
          </div>
          <div className="avatar">
            <div
              className="flex w-10 items-center justify-center text-white
              h-10 bg-[#5d7896]"
            >
              <FaUser />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default New_post;
