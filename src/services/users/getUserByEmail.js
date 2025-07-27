import prisma from "../../lib/prisma.js";

const getUserByEmail = async (email) => {
  return prisma.user.findMany({
    where: { email },
  });
};

export default getUserByEmail;
