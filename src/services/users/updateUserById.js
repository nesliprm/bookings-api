import prisma from "../../lib/prisma.js";

const updateUserById = async (id, updatedUser) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: { ...updatedUser },
    });
  } catch (error) {
    return null;
  }
};

export default updateUserById;
