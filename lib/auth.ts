import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ACCESS_SECRET = process.env.ACCESS_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;

/* GENERATE ACCESS TOKEN (15 minutes) */
export const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

/* GENERATE REFRESH TOKEN (7 days) */
export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

/* VERIFY ACCESS TOKEN */
export const verifyAccessToken = async () => {

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "No access token provided" },
      { status: 401 }
    );
  }

  try {

    const decoded = jwt.verify(token, ACCESS_SECRET);

    return decoded;

  } catch (err) {

    return NextResponse.json(
      { message: "Access token expired or invalid" },
      { status: 401 }
    );

  }
};

/* VERIFY REFRESH TOKEN */
export const verifyRefreshToken = async () => {

  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;

  if (!token) {
    return null;
  }

  try {

    const decoded = jwt.verify(token, REFRESH_SECRET);

    return decoded;

  } catch (err) {

    return null;

  }
};