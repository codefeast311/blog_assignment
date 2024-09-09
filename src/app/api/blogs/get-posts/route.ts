import { NextResponse } from "next/server";
import dbConnect from "@/app/utils/mongoose";
import Post from "../../../models/Post";
export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();

  try {
    const blogs = await Post.find({});
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching blogs", error },
      { status: 500 }
    );
  }
}
