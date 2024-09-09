import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
