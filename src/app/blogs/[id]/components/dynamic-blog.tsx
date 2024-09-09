"use client";
import { blog } from "@/app/page";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

const DynamicBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = React.useState(true);
  const [blog, setBlog] = React.useState<blog>({
    title: "",
    content: "",
    author: "",
    createdAt: "",
    _id: "",
  });

  useEffect(() => {
    axios.get(`/api/blogs/get-post?id=${id}`).then((res) => {
      setBlog(res.data);
      setLoading(false);
    });
  }, [id]);
  return (
    <div className="p-4 md:p-8 flex flex-col gap-4 md:gap-8">
      {loading ? (
        <div className="flex flex-col h-[400px] justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4">
          <h4 className="text-xl font-bold">{blog.title}</h4>
          <p className="text-sm text-gray-600">Author: {blog.author}</p>
          <p className="text-sm text-gray-600">Created At: {blog.createdAt}</p>
          <p className="text-sm text-gray-600">{blog.content}</p>
        </div>
      )}
    </div>
  );
};

export default DynamicBlog;
