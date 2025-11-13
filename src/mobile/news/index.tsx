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
import Api from "../../components/api";
import { useAuth } from "../../context/authContext";
import User_info from "./User_info";

interface ImageType {
  id: number;
  image: string;
}
interface PostsType {
  id: number;
  images: ImageType[];
  lat_location: string;
  likes: [];
  likes_count: 0;
  loadeds: [];
  location_name: string;
  long_location: string;
  noidung: string;
  shares: [];
  shares_count: 0;
  user: 1;
  username: string;
  vieweds: [];
  more: boolean;
  views_count: number;
  updated_at: string;
  created_at: string;
}

const News_index = () => {
  const [postLoading, setPostLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<PostsType[]>([]);
  const { user, loading } = useAuth();
  const loadMorePosts = useCallback(
    (limit: number = 10) => {
      if (postLoading || !hasMore) return;
      setHasMore(true);
      setPostLoading(true);
      const loaded_ids = [...new Set(posts?.map((p) => p.id))].join(",");
      Api.get(
        `/posts/?page_size=${limit}&show_ids=${loaded_ids}`,
        user?.access_token || localStorage.getItem("access_token") || ""
      )
        .then((res) => {
          if (res?.count === 0) setHasMore(false);
          setPosts((prevPosts) => [...prevPosts, ...res.results]);
        })
        .finally(() => setPostLoading(false));
    },
    [postLoading, hasMore, posts.length]
  );
  useEffect(() => {
    if (!user?.id) loadMorePosts(20);
  }, [loading]);
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
    <div className="pb-24 relative" ref={scrollRef}>
      <New_post />
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow mt-1">
          <div className="flex items-center p-3 pb-1">
            <User_info user_id={post.id} time={post?.created_at} />
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
          <div className="px-3 pb-2 flex flex-col overflow-hidden text-[13px]">
            <div>
              <pre className={`text-sm ${post?.more ? "" : "line-clamp-3"}`}>
                {post.noidung}
              </pre>
              {post.noidung?.split("\r")?.length > 3 && (
                <div
                  className="text-[#999] inline"
                  onClick={() =>
                    setPosts((o) =>
                      o?.map((p) =>
                        p.id === post.id ? { ...p, more: !p?.more } : p
                      )
                    )
                  }
                >
                  Xem thêm
                </div>
              )}
            </div>
            <div className="flex gap-1 mt-2">
              {post?.images?.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  alt="post"
                  className={`max-h-[180px] rounded-md w-full object-cover flex-1 border border-[#eee] bg-[#eee]
                  ${
                    post?.images?.length === 3
                      ? "aspect-1/3"
                      : post?.images?.length === 2
                      ? "aspect-3/2"
                      : "aspect-5/3"
                  }`}
                />
              ))}
            </div>
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
      {postLoading && (
        <div className="flex absolute w-screen top-8 items-center justify-center fadeInBot">
          <div className="flex p-4 rounded-full bg-white shadow">
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
