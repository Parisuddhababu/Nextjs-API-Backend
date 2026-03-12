import { NextResponse } from "next/server";
import { verifyRefreshToken, generateAccessToken } from "@/lib/auth";

export async function POST() {

  const decoded: any = await verifyRefreshToken();

  if (!decoded) {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 401 }
    );
  }

  const newAccessToken = generateAccessToken(decoded.id);

  const response = NextResponse.json({
    message: "Access token refreshed",
  });

  response.cookies.set("accessToken", newAccessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 15,
    path: "/",
  });

  return response;
}