import prisma from "../../lib/prisma.js";

const getProperties = async () => {
  return prisma.property.findMany({});
};

export default getProperties;
