import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth";

export async function POST(req: Request) {

  await connectDB();

  const { email, password } = await req.json();

  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

const accessToken = generateAccessToken(user._id);
const refreshToken = generateRefreshToken(user._id);

const response = NextResponse.json({
  message: "Login successful",
});

response.cookies.set("accessToken", accessToken, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: 60 * 15,
  path: "/",
});

response.cookies.set("refreshToken", refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
});

return response;
}