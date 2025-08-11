import prisma from "../../lib/prisma.js";

const deleteUserById = async (id) => {
  return await prisma.$transaction(async (tx) => {
    await tx.review.deleteMany({
      where: { userId: id },
    });

    await tx.booking.deleteMany({
      where: { userId: id },
    });

    return await tx.user.delete({
      where: { id },
    });
  });
};

export default deleteUserById;
