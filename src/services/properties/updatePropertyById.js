import prisma from "../../lib/prisma.js";

const updatePropertyById = async (id, updatedProperty) => {
  return prisma.property.update({
    where: { id },
    data: { ...updatedProperty },
  });
};

export default updatePropertyById;
