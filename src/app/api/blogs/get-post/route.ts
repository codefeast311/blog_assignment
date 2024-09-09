import { NextResponse } from "next/server";
import dbConnect from "@/app/utils/mongoose";
import Post from "../../../models/Post";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Missing post ID" }, { status: 400 });
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching post", error },
      { status: 500 }
    );
  }
}
