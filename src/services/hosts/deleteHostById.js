import prisma from "../../lib/prisma.js";

const deleteHostById = async (id) => {
  return await prisma.$transaction(async (tx) => {
    const props = await tx.property.findMany({
      where: { hostId: id },
      select: { id: true },
    });
    const propertyIds = props.map((p) => p.id);

    if (propertyIds.length > 0) {
      await tx.review.deleteMany({
        where: { propertyId: { in: propertyIds } },
      });

      await tx.booking.deleteMany({
        where: { propertyId: { in: propertyIds } },
      });
      await tx.property.deleteMany({ where: { hostId: id } });
    }

    return await tx.host.delete({ where: { id } });
  });
};

export default deleteHostById;
