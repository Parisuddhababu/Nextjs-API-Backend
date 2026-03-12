import { NextResponse } from "next/server";
import { verifyRefreshToken, generateAccessToken } from "@/lib/auth";

export async function POST(req: Request) {

  const { refreshToken } = await req.json();

  const decoded: any = verifyRefreshToken(refreshToken);

  if (!decoded) {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 401 }
    );
  }

  const newAccessToken = generateAccessToken(decoded.id);

  return NextResponse.json({
    accessToken: newAccessToken
  });
}