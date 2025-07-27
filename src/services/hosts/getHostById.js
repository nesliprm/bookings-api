import prisma from "../../lib/prisma.js";

const getHostById = async (id) => {
  return prisma.host.findUnique({
    where: { id },
  });
};

export default getHostById;
