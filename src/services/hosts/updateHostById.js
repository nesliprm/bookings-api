import prisma from "../../lib/prisma.js";

const updateHostById = async (id, updatedHost) => {
  return prisma.host.update({
    where: { id },
    data: { ...updatedHost },
  });
};

export default updateHostById;
