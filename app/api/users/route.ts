import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user";
import { verifyAccessToken } from "@/lib/auth";

/* GET USERS */
export async function GET() {

  const auth = verifyAccessToken();

  if (auth instanceof Response) {
    return auth;
  }

  await connectDB();

  const users = await User.find();

  return NextResponse.json(users);
}

/* CREATE USER */
export async function POST(req: Request) {
  const auth = await verifyAccessToken();

  if (auth instanceof Response) {
    return auth;
  }
  await connectDB();

  const body = await req.json();

  const user = await User.create({
    name: body.name,
    email: body.email,
    
  });

  return NextResponse.json(user);
}

/* DELETE USER */
export async function DELETE(req: Request) {
  await connectDB();

  const { id } = await req.json();

  await User.findByIdAndDelete(id);

  return NextResponse.json({
    message: "User deleted successfully",
  });
}

/* UPDATE USER */
export async function PUT(req: Request) {
  await connectDB();

  const { id, name, email } = await req.json();

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, email },
    { new: true }
  );

  return NextResponse.json(updatedUser);
}