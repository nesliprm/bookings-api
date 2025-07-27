import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import getUserByUsername from "../services/users/getUserByUsername.js";
import getUserByEmail from "../services/users/getUserByEmail.js";
import updateUserById from "../services/users/updateUserById.js";
import createUser from "../services/users/createUser.js";
import deleteUserById from "../services/users/deleteUserById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const { username, email } = req.query;

  try {
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
  const { username, password, name, email, phoneNumber, pictureUrl } = req.body;

  try {
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

router.post("/", async (req, res) => {
  const { username, password, name, email, phoneNumber, pictureUrl } = req.body;
  const newUser = await createUser(
    username,
    password,
    name,
    email,
    phoneNumber,
    pictureUrl
  );
  res.status(201).json(newUser);
});

router.delete("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await deleteUserById(id);

    if (user) {
      res.status(200).send({
        message: `User with id ${id} successfully deleted`,
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

export default router;
