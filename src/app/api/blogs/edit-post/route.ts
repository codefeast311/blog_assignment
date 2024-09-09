import { NextResponse } from "next/server";
import dbConnect from "@/app/utils/mongoose";
import Post from "../../../models/Post";
export const dynamic = "force-dynamic";
export async function PUT(req: Request) {
  await dbConnect();

  try {
    const { id, title, content, author } = await req.json();

    if (!id || !title || !content || !author) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, author, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Post updated successfully", post: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating post", error },
      { status: 500 }
    );
  }
}
