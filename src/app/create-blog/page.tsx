"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";

interface BlogFormState {
  author: string;
  title: string;
  content: string;
}

export default function BlogForm() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [formData, setFormData] = useState<BlogFormState>({
    author: "",
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState<Partial<BlogFormState>>({});

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
    try {
      if (validateForm()) {
        //submit form
        const res = await axios.post("/api/blogs/create-post", formData);
        console.log(res);
        setFormData({ author: "", title: "", content: "" });
        enqueueSnackbar("Post created successfully", { variant: "success" });
        router.push("/");
      } else {
        enqueueSnackbar("Please fill out all required fields", {
          variant: "error",
        });
      }
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Error creating post", { variant: "error" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg text-black">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Create a New Blog
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
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
}
