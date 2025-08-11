import prisma from "../../lib/prisma.js";

const getPropertyByPrice = async (pricePerNight) => {
  return prisma.property.findMany({
    where: { pricePerNight },
  });
};

export default getPropertyByPrice;
