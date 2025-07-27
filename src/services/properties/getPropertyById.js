import prisma from "../../lib/prisma.js";

const getPropertyById = async (id) => {
  return prisma.property.findUnique({
    where: { id },
  });
};

export default getPropertyById;
