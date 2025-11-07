import { Spin, Tooltip } from "antd";
import { FaShare, FaTrash } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import BlurImage from "../../components/BlurImage";
import { BiSolidTag } from "react-icons/bi";

const News_index = () => {
  // Mock data giả để demo
  const posts = [
    {
      id: 1,
      user: {
        name: "Nguyễn Văn A",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      company: "Compal",
      emoji: "đang vui",
      location: "Bá Thiện II",
      time: "2 giờ trước",
      content: "Hôm nay trời đẹp quá, đi dạo thôi 🌤️",
      image: "https://picsum.photos/id/237/400/300", // ảnh cố định
    },
    {
      id: 2,
      user: {
        name: "Trần Thị B",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      emoji: "đang thấy sốc",
      time: "5 giờ trước",
      location: "Bá Thiện I",
      content: "Núi này to vãi.",
      image: "https://picsum.photos/id/235/400/300", // ảnh cố định
    },
    {
      id: 2,
      user: {
        name: "Huỳnh Đức Bắc",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      emoji: "",
      time: "5 giờ trước",
      location: "Bá Thiện I",
      content: "Tàu lừ nè mọi người 🍲",
      image: "https://picsum.photos/id/233/400/300", // ảnh cố định
    },
  ];

  return (
    <div className="pb-24">
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow mt-1">
          <div className="flex items-center p-3">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-10 h-10 mr-3"
            />
            <div className="flex flex-col">
              <div className="flex gap-1 text-[12px] items-baseline">
                <p className="font-semibold">{post.user.name}</p>
              </div>
              <span className="text-gray-500 flex items-center mt-0.5 gap-1 text-[10px] leading-[1.2]">
                {post?.company && `${post?.company}, `}
                {post.location}
              </span>
              <span className="text-gray-500 text-[9px] leading-[1.3]">
                {post.time}
              </span>
            </div>
            <Tooltip
              trigger="click"
              color="white"
              placement="leftBottom"
              title={
                <div className="text-[#6b6c6e] w-[100px] text-[13px]">
                  <div className="flex items-center gap-2 border-b border-[#d4d4d4] py-0.5 px-1 active:text-black transition-all duration-300">
                    <FaShare />
                    Chia sẻ
                  </div>
                  <div className="flex items-center gap-2 border-b border-[#d4d4d4] py-0.5 px-1 active:text-black transition-all duration-300">
                    <BiSolidTag className="rotate-180" />
                    Lưu
                  </div>
                  <div className="flex py-0.5 text-[#ff4800] px-1 items-center gap-2 active:text-[#e61d1d] transition-all duration-300">
                    <FaTrash />
                    Xóa
                  </div>
                </div>
              }
            >
              <div className="ml-auto mb-auto">
                <FiMoreHorizontal className="text-[#999] active:text-black transition-all duration-300" />
              </div>
            </Tooltip>
          </div>
          <div className="px-3 pb-2">
            <p className="text-sm mb-2">{post.content}</p>
            {post.image && (
              <BlurImage
                src={post.image}
                alt="post"
                className="rounded-md w-full object-cover"
              />
            )}
          </div>
          <div className="flex justify-around py-2 border-t border-[#0003] text-gray-600 text-sm">
            <button className="flex items-center gap-1 hover:text-blue-600">
              👍 Thích
            </button>
            <button className="flex items-center gap-1 hover:text-blue-600">
              💬 Bình luận
            </button>
            <button className="flex items-center gap-1 hover:text-blue-600">
              🔄 Chia sẻ
            </button>
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-1 p-6 items-center justify-center text-[#999] text-sm">
        <Spin />
        Đã hết nội dung...
      </div>
    </div>
  );
};

export default News_index;
