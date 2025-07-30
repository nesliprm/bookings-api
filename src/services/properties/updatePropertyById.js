import prisma from "../../lib/prisma.js";

const updatePropertyById = async (id, updatedProperty) => {
  try {
    return await prisma.property.update({
      where: { id },
      data: { ...updatedProperty },
    });
  } catch (error) {
    return null;
  }
};

export default updatePropertyById;
