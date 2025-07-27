import prisma from "../../lib/prisma.js";

const deleteHost = async (id) => {
  return prisma.host.delete({
    where: { id },
  });
};

export default deleteHost;
