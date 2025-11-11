import { Spin, Tooltip } from "antd";
import { FaShare, FaTrash } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import BlurImage from "../../components/BlurImage";
import {
  BiCommentDetail,
  BiSolidTag,
  BiSolidUpArrowCircle,
} from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import { RiShareForwardFill } from "react-icons/ri";
import New_post from "./new_post";
import { useCallback, useEffect, useRef, useState } from "react";

const News_index = () => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState([
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
      id: 3,
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
    {
      id: 4,
      user: {
        name: "Huỳnh Đức Bắc",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      emoji: "",
      time: "5 giờ trước",
      location: "Bá Thiện I",
      content: "Tàu lừ nè mọi người 🍲",
      image: "https://picsum.photos/id/234/400/300", // ảnh cố định
    },
    {
      id: 5,
      user: {
        name: "Huỳnh Đức Bắc",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      emoji: "",
      time: "5 giờ trước",
      location: "Bá Thiện I",
      content: "Tàu lừ nè mọi người 🍲",
      image: "https://picsum.photos/id/235/400/300", // ảnh cố định
    },
    {
      id: 6,
      user: {
        name: "Huỳnh Đức Bắc",
        avatar: "https://i.pravatar.cc/150?img=6",
      },
      emoji: "",
      time: "5 giờ trước",
      location: "Bá Thiện I",
      content: "Tàu lừ nè mọi người 🍲",
      image: "https://picsum.photos/id/236/400/300", // ảnh cố định
    },
    {
      id: 7,
      user: {
        name: "Huỳnh Đức Bắc",
        avatar: "https://i.pravatar.cc/150?img=7",
      },
      emoji: "",
      time: "5 giờ trước",
      location: "Bá Thiện I",
      content: "Tàu lừ nè mọi người 🍲",
      image: "https://picsum.photos/id/237/400/300", // ảnh cố định
    },
    {
      id: 8,
      user: {
        name: "Huỳnh Đức Bắc",
        avatar: "https://i.pravatar.cc/150?img=8",
      },
      emoji: "",
      time: "5 giờ trước",
      location: "Bá Thiện I",
      content: "Tàu lừ nè mọi người 🍲",
      image: "https://picsum.photos/id/238/400/300", // ảnh cố định
    },
    {
      id: 9,
      user: {
        name: "Huỳnh Đức Bắc",
        avatar: "https://i.pravatar.cc/150?img=9",
      },
      emoji: "",
      time: "5 giờ trước",
      location: "Bá Thiện I",
      content: "Tàu lừ nè mọi người 🍲",
      image: "https://picsum.photos/id/239/400/300", // ảnh cố định
    },
    {
      id: 10,
      user: {
        name: "Huỳnh Đức Bắc",
        avatar: "https://i.pravatar.cc/150?img=10",
      },
      emoji: "",
      time: "5 giờ trước",
      location: "Bá Thiện I",
      content: "Tàu lừ nè mọi người 🍲",
      image: "https://picsum.photos/id/240/400/300", // ảnh cố định
    },
  ]);
  const fetchNewPosts = (startId = 0, limit = 6) => {
    console.log("Đang tải:", startId, limit);
    const newPosts = [];
    for (let i = 0; i < limit; i++) {
      const id = startId + i;
      newPosts.push({
        id: id,
        user: {
          name: `Người dùng mới ${id}`,
          avatar: `https://i.pravatar.cc/150?img=${20 + id}`,
        },
        emoji: `đang làm việc`,
        company: "Compal",
        location: "Bá Thiện III",
        time: `${Math.floor(Math.random() * 10) + 1} phút trước`,
        content: `Đây là bài viết mới được tải lên lần cuộn thứ ${Math.ceil(
          id / 3
        )}.`,
        image: `https://picsum.photos/id/${100 + id}/400/300`,
      });
    }
    return newPosts;
  };
  const loadMorePosts = useCallback(() => {
    if (loading || !hasMore) return;
    setHasMore(true);
    setLoading(true);
    const nextId = posts.length + 1;
    const newPosts = fetchNewPosts(nextId, 10);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setLoading(false);
    if (posts.length + newPosts.length >= 200) {
      setHasMore(false);
    }
  }, [loading, hasMore, posts.length]);
  useEffect(() => {
    const element = scrollRef.current; // Lấy ra phần tử DOM
    if (!element) return; // Đảm bảo phần tử tồn tại
    const handleScroll = () => {
      const {
        scrollTop, // Vị trí cuộn đã qua
        clientHeight, // Chiều cao hiển thị của phần tử
        scrollHeight, // Tổng chiều cao nội dung bên trong phần tử
      } = element;

      if (scrollTop + clientHeight >= scrollHeight - 1200) {
        loadMorePosts();
      }
    };
    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [loadMorePosts]);
  const handleScrollToTop = () => {
    scrollRef?.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="pb-24" ref={scrollRef}>
      <New_post />
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
          <div className="flex justify-around h-10 border-t border-[#0003] text-[#999] text-sm">
            <button className="flex items-center flex-1 justify-center gap-1 hover:text-[#07f]">
              <AiOutlineLike />
            </button>
            <button className="flex items-center flex-1 justify-center gap-1 hover:text-[#07f]">
              <BiCommentDetail />
            </button>
            <button className="flex items-center flex-1 justify-center gap-1 hover:text-[#07f]">
              <RiShareForwardFill />
            </button>
          </div>
        </div>
      ))}
      {loading && (
        <div className="flex absolute w-screen top-8 items-center justify-center fadeInBot">
          <div className="flex p-4 rounded-full bg-white">
            <Spin />
          </div>
        </div>
      )}
      {!hasMore && (
        <div className="flex gap-2 top-8 text-[#999] p-8 items-center justify-center">
          <div
            className="flex gap-3 bg-white p-2 items-center px-4 rounded-md shadow"
            onClick={handleScrollToTop}
          >
            <BiSolidUpArrowCircle size={18} />
            Về đầu trang!
          </div>
        </div>
      )}
    </div>
  );
};

export default News_index;
