import { ArrowRightAlt, Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BlogCard = ({
  title,
  author,
  createdAt,
  _id,
  deleteBlogHandler,
}: {
  title: string;
  author: string;
  createdAt: string;
  _id: string;
  deleteBlogHandler: (id: string) => void;
}) => {
  const router = useRouter();
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4 hover:bg-gray-200 ">
      <Image
        src={
          "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="blog image"
        width={600}
        height={400}
        className="h-[320px] overflow-hidden rounded-xl"
      />
      <h4 className="text-xl font-bold">{title}</h4>
      <p className="text-sm text-gray-600">Author: {author}</p>
      <p className="text-sm text-gray-600">Created At: {createdAt}</p>
      <div className="flex flex-row gap-2">
        <Button
          onClick={() => router.push(`/blogs/${_id}`)}
          variant="contained"
          color="primary"
          className="flex gap-2"
        >
          <span>VIEW</span>
          <ArrowRightAlt />
        </Button>
        <Button
          onClick={() => router.push(`/edit-blog/${_id}`)}
          variant="contained"
          color="primary"
          className="flex gap-2"
        >
          <Edit />
          <span>EDIT</span>
        </Button>
        <Button
          onClick={() => deleteBlogHandler(_id)}
          variant="contained"
          color="error"
          className="flex gap-2"
        >
          <Delete />
          <span>DELETE</span>
        </Button>
      </div>
    </div>
  );
};

export default BlogCard;
