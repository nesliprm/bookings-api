import prisma from "../../lib/prisma.js";

const deleteUser = async (id) => {
  try {
    return await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
};

export default deleteUser;
