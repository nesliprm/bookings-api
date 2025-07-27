import prisma from "../../lib/prisma.js";

const getPropertyByLocation = async (location) => {
  return prisma.property.findMany({
    where: { location },
  });
};

export default getPropertyByLocation;
