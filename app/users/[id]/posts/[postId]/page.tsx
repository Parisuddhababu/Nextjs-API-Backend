"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export default function PostPage() {

  const params = useParams();

  const userId = params.id;
  const postId = params.postId;

  const [post, setPost] = useState<any>(null);

  const fetchPost = async () => {

    const res = await apiFetch(`/api/users/${userId}/posts/${postId}`);
    const data = await res.json();

    setPost(data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>Post Details</h1>

      <p>User ID: {post.userId}</p>
      <p>Post ID: {post.postId}</p>
      <p>Title: {post.title}</p>
      <p>Content: {post.content}</p>

    </div>
  );
}