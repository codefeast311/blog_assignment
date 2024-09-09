"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

interface BlogFormState {
  author: string;
  title: string;
  content: string;
}

interface BlogFormProps {
  id?: string; // Optional id for editing a post
}

export default function EditBlog({ id }: BlogFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [formData, setFormData] = useState<BlogFormState>({
    author: "",
    title: "",
    content: "",
  });
  const [errors, setErrors] = useState<Partial<BlogFormState>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      // Fetch the post data for editing
      const fetchPost = async () => {
        try {
          const res = await axios.get(`/api/blogs/get-post?id=${id}`);
          setFormData(res.data);
        } catch (e) {
          console.error(e);
          enqueueSnackbar("Error fetching post data", { variant: "error" });
        }
      };

      fetchPost();
    }
  }, [id, enqueueSnackbar]);

  const validateForm = () => {
    const newErrors: Partial<BlogFormState> = {};

    if (!formData.author) {
      newErrors.author = "Author name is required";
    }

    if (!formData.title) {
      newErrors.title = "Title is required";
    }

    if (!formData.content) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // If no errors, form is valid
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);

        if (id) {
          // Update existing post
          await axios.put("/api/blogs/edit-post", { id, ...formData });
          enqueueSnackbar("Post updated successfully", { variant: "success" });
        }

        setFormData({ author: "", title: "", content: "" });
        router.push("/");
      } catch (e) {
        console.error(e);
        enqueueSnackbar(id ? "Error updating post" : "Error creating post", {
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      enqueueSnackbar("Please fill out all required fields", {
        variant: "error",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg text-black">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        {id ? "Edit Blog Post" : "Create a New Blog"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700"
          >
            Author Name:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.author && (
            <span className="text-red-500 text-sm">{errors.author}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows={5}
          />
          {errors.content && (
            <span className="text-red-500 text-sm">{errors.content}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 font-semibold rounded-md shadow ${
            isLoading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          } text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
        >
          {id ? "Update Blog" : "Submit Blog"}
        </button>
      </form>
    </div>
  );
}
