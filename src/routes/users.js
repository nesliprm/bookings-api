import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import getUserByUsername from "../services/users/getUserByUsername.js";
import getUserByEmail from "../services/users/getUserByEmail.js";
import updateUserById from "../services/users/updateUserById.js";
import createUser from "../services/users/createUser.js";
import deleteUserById from "../services/users/deleteUserById.js";
import auth from "../middleware/auth.js";
import prisma from "../lib/prisma.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const { username, email } = req.query;

  try {
    if ("username" in req.query && username.trim() === "") {
      return res
        .status(400)
        .json({ message: "Please provide a username to search." });
    }

    if ("email" in req.query && email.trim() === "") {
      return res
        .status(400)
        .json({ message: "Please provide an email to search." });
    }

    if (username) {
      const users = await getUserByUsername(username);

      if (!users.length) {
        return res
          .status(404)
          .json({ message: `User with username "${username}" not found` });
      }

      return res.status(200).json(users);
    }

    if (email) {
      const users = await getUserByEmail(email);

      if (!users.length) {
        return res
          .status(404)
          .json({ message: `User with email "${email}" not found` });
      }

      return res.status(200).json(users);
    }

    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ message: `User with id ${id} not found` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  const { id } = req.params;

  try {
    const { username, password, name, email, phoneNumber, pictureUrl } =
      req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Missing update data — fields cannot be empty.",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }

    if (username && username !== existingUser.username) {
      const usernameTaken = await prisma.user.findUnique({
        where: { username },
      });
      if (usernameTaken) {
        return res.status(409).json({ message: "Username already exists." });
      }
    }

    if (email && email !== existingUser.email) {
      const emailTaken = await prisma.user.findUnique({ where: { email } });
      if (emailTaken) {
        return res.status(409).json({ message: "Email already exists." });
      }
    }

    const user = await updateUserById(id, {
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl,
    });

    if (user) {
      res.status(200).send({
        message: `User with id ${id} successfully updated`,
        user,
      });
    } else {
      res.status(404).json({
        message: `User with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  const { username, password, name, email, phoneNumber, pictureUrl } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Username, password, and email are required." });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: email }, { username: username }],
    },
  });

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "Email or username already in use" });
  }

  try {
    console.log("About to create user:", username);
    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      pictureUrl
    );

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await deleteUserById(id);

    res.status(200).send({
      message: `User with id ${id} successfully deleted`,
      user,
    });
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(409).json({
        message: "Cannot delete user with bookings.",
      });
    }
    if (error.code === "P2025") {
      return res.status(404).json({ message: `User with id ${id} not found` });
    }

    next(error);
  }
});

export default router;
