import { NextResponse } from "next/server";
import dbConnect from "@/app/utils/mongoose";
import Post from "@/app/models/Post";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  await dbConnect();

  try {
    const { author, title, content } = await req.json();

    if (!author || !title || !content) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newPost = new Post({ author, title, content });
    await newPost.save();

    return NextResponse.json(
      { message: "Post created successfully", postId: newPost._id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating post", error },
      { status: 500 }
    );
  }
}
