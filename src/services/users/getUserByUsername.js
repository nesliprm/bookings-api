import prisma from "../../lib/prisma.js";

const getUserByUsername = async (username) => {
  return prisma.user.findMany({
    where: { username },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
    },
  });
};

export default getUserByUsername;
