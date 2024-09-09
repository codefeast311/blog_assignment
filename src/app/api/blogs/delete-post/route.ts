import { NextResponse } from "next/server";
import dbConnect from "@/app/utils/mongoose";
import Post from "../../../models/Post";
export const dynamic = "force-dynamic";
export async function DELETE(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Missing post ID" }, { status: 400 });
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting post", error },
      { status: 500 }
    );
  }
}
