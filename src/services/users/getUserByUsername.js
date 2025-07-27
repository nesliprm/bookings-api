import prisma from "../../lib/prisma.js";

const getUserByUsername = async (username) => {
  return prisma.user.findMany({
    where: { username },
  });
};

export default getUserByUsername;
