import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/lumio";
import { connectToDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 11);

    const newUser = new User({ username: username, email:email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (err: any) {
    console.error("Register Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
