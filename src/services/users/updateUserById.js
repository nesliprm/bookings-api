import prisma from "../../lib/prisma.js";

const updateUserById = async (id, updatedUser) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: { ...updatedUser },
    });
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }
    throw error;
  }
};

export default updateUserById;
