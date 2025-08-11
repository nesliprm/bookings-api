import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import getHostByName from "../services/hosts/getHostByName.js";
import updateHostById from "../services/hosts/updateHostById.js";
import createHost from "../services/hosts/createHost.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import auth from "../middleware/auth.js";
import prisma from "../lib/prisma.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const { name } = req.query;

  try {
    if ("name" in req.query && name.trim() === "") {
      return res
        .status(400)
        .json({ message: "Please provide a host name to search." });
    }

    if (name) {
      const hosts = await getHostByName(name);

      if (!hosts.length) {
        return res
          .status(404)
          .json({ message: `Host with name "${name}" not found` });
      }

      return res.status(200).json(hosts);
    }

    const hosts = await getHosts();
    res.status(200).json(hosts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const host = await getHostById(id);

    if (!host) {
      res.status(404).json({ message: `Host with id ${id} not found` });
    } else {
      res.status(200).json(host);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Missing update data — fields cannot be empty.",
      });
    }

    const existingHost = await prisma.host.findUnique({
      where: { id },
    });

    if (!existingHost) {
      return res.status(404).json({ message: `Host with id ${id} not found` });
    }

    if (username && username !== existingHost.username) {
      const usernameTaken = await prisma.host.findUnique({
        where: { username },
      });
      if (usernameTaken) {
        return res.status(409).json({ message: "Username already exists." });
      }
    }

    if (email && email !== existingHost.email) {
      const emailTaken = await prisma.host.findUnique({ where: { email } });
      if (emailTaken) {
        return res.status(409).json({ message: "Email already exists." });
      }
    }

    const host = await updateHostById(id, {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    });

    if (host) {
      res.status(200).send({
        message: `Host with id ${id} successfully updated`,
        host,
      });
    } else {
      res.status(404).json({
        message: `Host with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;

    if (!username || !password || !name || !email || !phoneNumber) {
      return res.status(400).json({
        message: "Missing required host details.",
      });
    }

    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.status(201).json(newHost);
  } catch (error) {
    if (
      error.code === "P2002" &&
      Array.isArray(error.meta?.target) &&
      error.meta.target.includes("email")
    ) {
      return res.status(409).json({ message: "Email already exists." });
    }

    if (
      error.code === "P2002" &&
      Array.isArray(error.meta?.target) &&
      error.meta.target.includes("username")
    ) {
      return res.status(409).json({ message: "Username already exists." });
    }

    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  try {
    const host = await deleteHostById(id);

    res.status(200).send({
      message: `Host with id ${id} successfully deleted`,
      host,
    });
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(409).json({
        message: "Cannot delete host with properties.",
      });
    }
    if (error.code === "P2025") {
      return res.status(404).json({ message: `Host with id ${id} not found.` });
    }
    next(error);
  }
});

export default router;
