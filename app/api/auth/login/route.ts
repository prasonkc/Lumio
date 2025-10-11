import type { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "@/lib/mongodb";
import User from "@/models/lumio";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToMongo();

  if (req.method === "POST") {
    const { username, email, passwordHash } = req.body;
    const user = await User.create({ username, email, passwordHash });
    return res.status(201).json(user);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
