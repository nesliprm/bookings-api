import prisma from "../../lib/prisma.js";

const deletePropertyById = async (id) => {
  return prisma.property.delete({
    where: { id },
  });
};

export default deletePropertyById;
