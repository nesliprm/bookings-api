import { Router } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";

const router = Router();

router.post("/", async (req, res) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    secretKey
  );

  res.status(200).json({ message: "Successfully logged in!", token });
});

export default router;
