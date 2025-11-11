// src/components/PostMeta.tsx

import React from "react";
import { Helmet } from "react-helmet-async";

// ⭐️ Định nghĩa interface cho dữ liệu bài viết
interface PostData {
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  slug: string;
}
interface PostMetaProps {
  post: PostData;
}

const PostMeta: React.FC<PostMetaProps> = ({ post }) => {
  if (!post) return null;
  const BASE_URL = "https://yourwebsite.com";
  const postUrl = `${BASE_URL}/${post.slug}`;
  const metaDescription = post.summary || post.content.substring(0, 150);
  return (
    <Helmet>
      {/* 1. Tiêu đề và Mô tả Cơ bản (Google SEO) */}
      <title>{post.title} | Tên Trang Web Của Bạn</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={postUrl} />

      {/* 2. Meta Tag cho Mạng Xã hội (Open Graph - Facebook/Zalo) */}
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={postUrl} />
      <meta property="og:image" content={post.imageUrl} />

      {/* 3. Meta Tag cho Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={post.imageUrl} />
    </Helmet>
  );
};

export default PostMeta;
