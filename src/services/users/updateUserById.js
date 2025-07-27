import prisma from "../../lib/prisma.js";

const updateUserById = async (id, updatedUser) => {
  return prisma.user.update({
    where: { id },
    data: { ...updatedUser },
  });
};

export default updateUserById;
