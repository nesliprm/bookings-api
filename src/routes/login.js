import { Router } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const router = Router();

router.post("/", async (req, res) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const { username, password } = req.body;

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username.trim().length === 0 ||
    password.trim().length === 0
  ) {
    return res.status(400).json({
      message: "Username and password are required and cannot be empty.",
    });
  }

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    secretKey
  );

  res.status(200).json({ message: "Successfully logged in!", token });
});

export default router;
