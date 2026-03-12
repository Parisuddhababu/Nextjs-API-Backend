import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";
import { verifyAccessToken } from "@/lib/auth";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {

  const auth = await verifyAccessToken(req);

  if (auth instanceof Response) {
    return auth;
  }

  const { id } = await context.params;

  await connectDB();

  const user = await User.findById(id);

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}