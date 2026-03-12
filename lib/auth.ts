import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const ACCESS_SECRET = process.env.ACCESS_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;

/* GENERATE ACCESS TOKEN */
export const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, ACCESS_SECRET, {
    expiresIn: "2m",
  });
};

/* GENERATE REFRESH TOKEN */
export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

/* VERIFY ACCESS TOKEN (Bearer Token) */
export const verifyAccessToken = (req: Request) => {

  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "No token provided" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, ACCESS_SECRET);

    return decoded;

  } catch {

    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );

  }
};

/* VERIFY REFRESH TOKEN */
export const verifyRefreshToken = (token: string) => {

  try {
    const decoded = jwt.verify(token, REFRESH_SECRET);
    return decoded;
  } catch {
    return null;
  }

};