import prisma from "../../lib/prisma.js";

const getPropertyByLocation = async (location) => {
  return prisma.property.findMany({
    where: { location: { contains: location.toLowerCase() } },
  });
};

export default getPropertyByLocation;
