import prisma from "../../lib/prisma.js";

const getPropertyByPrice = async (maxPrice) => {
  // Matching exact price is a bit strange,
  // so I decided to get properties with equal or less than the queried price.

  return prisma.property.findMany({
    where: { pricePerNight: { lte: Number(maxPrice) } },
  });
};

export default getPropertyByPrice;
