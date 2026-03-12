import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string; postId: string }> }
) {

  const { id, postId } = await context.params;

  return NextResponse.json({
    userId: id,
    postId: postId,
    title: "Sample Post",
    content: "This is a nested route example",
  });
}