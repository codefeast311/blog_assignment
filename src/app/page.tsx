"use client";
import { Button, CircularProgress } from "@mui/material";
import BlogCard from "./components/cards/blog-card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

export interface blog {
  title: string;
  content: string;
  author: string;
  createdAt: string;
  _id: string;
}

export default function Home() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [blogs, setBlogs] = useState<blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/blogs/get-posts")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch(() => {
        enqueueSnackbar("Error fetching blogs", { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [enqueueSnackbar]);

  console.log(blogs);

  const deleteBlogHandler = async (id: string) => {
    try {
      await axios.delete(`/api/blogs/delete-post?id=${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      enqueueSnackbar("Blog deleted successfully", { variant: "success" });
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Error deleting blog", { variant: "error" });
    }
  };

  return (
    <div className="bg-white text-black p-4 md:p-8 flex flex-col gap-4 md:gap-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">All blogs</h2>
        <Button
          onClick={() => router.push("/create-blog")}
          variant="contained"
          color="primary"
        >
          CREATE BLOG
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col h-[400px] justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs?.map((blog, index) => (
            <BlogCard
              key={index}
              title={blog.title}
              author={blog.author}
              createdAt={blog.createdAt}
              _id={blog._id}
              deleteBlogHandler={deleteBlogHandler}
            />
          ))}
        </div>
      )}
      {!loading && blogs.length === 0 && (
        <div className="text-center text-lg font-semibold">No blogs found</div>
      )}
    </div>
  );
}
