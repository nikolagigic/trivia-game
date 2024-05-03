import { Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "../lib/prisma-client";
import bcrypt from "bcrypt";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment");
}

const SALT_ROUNDS = 10;

const createuser = async (req: Request, res: Response) => {
  const email = req.body.email._value;

  const userExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const password = req.body.password._value;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  res.status(200).json({ message: "User created" });
};

export default createuser;
