import prisma from "../../lib/prisma.js";

const deleteUser = async (id) => {
  return prisma.user.delete({
    where: { id },
  });
};

export default deleteUser;
