import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../lib/prisma-client";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment");
}

const loginUser = async (req: Request, res: Response) => {
  const email = req.body.email._value;
  const password = req.body.password._value;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ email }, JWT_SECRET);

  res.status(200).json({ token });
};

export default loginUser;
