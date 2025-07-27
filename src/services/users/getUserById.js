import prisma from "../../lib/prisma.js";

const getUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export default getUserById;
