import prisma from "../../lib/prisma.js";

const updateHostById = async (id, updatedHost) => {
  try {
    return await prisma.host.update({
      where: { id },
      data: { ...updatedHost },
    });
  } catch (error) {
    return null;
  }
};

export default updateHostById;
