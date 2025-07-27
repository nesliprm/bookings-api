import prisma from "../../lib/prisma.js";

const getHostByName = async (name) => {
  return prisma.host.findMany({
    where: { name },
  });
};

export default getHostByName;
