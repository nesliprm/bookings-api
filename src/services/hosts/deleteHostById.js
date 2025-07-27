import prisma from "../../lib/prisma.js";

const deleteHostById = async (id) => {
  return prisma.host.delete({
    where: { id },
  });
};

export default deleteHostById;
