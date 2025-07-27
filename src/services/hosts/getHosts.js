import prisma from "../../lib/prisma.js";

const getHosts = async () => {
  return prisma.host.findMany({});
};

export default getHosts;
