import prisma from "../../lib/prisma.js";

const deleteBookingById = async (id) => {
  return prisma.booking.delete({
    where: { id },
  });
};

export default deleteBookingById;
