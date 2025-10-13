import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/mongodb";
import User from "@/models/lumio"

export async function POST(req: Request) {
    try {
        // Get the username, email and password and verify it
        const { name, email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        await connectToDB();

        // Return if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 11);

        // Create a new user and save it to database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return NextResponse.json(
            { message: "User registered successfully", userId: newUser._id.toString() },
            { status: 201 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}