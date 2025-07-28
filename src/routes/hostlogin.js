import { Router } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const router = Router();

router.post("/", async (req, res) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const { username, password } = req.body;
  const host = await prisma.host.findUnique({ where: { username } });

  if (!host) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  if (host.password !== password) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const token = jwt.sign(
    { userId: host.id, username: host.username },
    secretKey
  );

  res.status(200).json({ message: "Successfully logged in!", token });
});

export default router;
