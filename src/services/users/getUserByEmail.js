import prisma from "../../lib/prisma.js";

const getUserByEmail = async (email) => {
  return prisma.user.findMany({
    where: { email },
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

export default getUserByEmail;
