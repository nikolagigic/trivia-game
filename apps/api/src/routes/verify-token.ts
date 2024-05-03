import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "../lib/prisma-client";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be set in .env");
}

const verifyToken = async (req: Request, res: Response) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .send({ message: "A token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      email: string;
      iat: number;
    };
    if (!decoded?.email) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
      select: {
        id: true,
      },
    });

    if (!user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    return res.status(200).json();
  } catch (error) {
    return res.status(401).send({ message: "Invalid token" });
  }
};

export default verifyToken;
