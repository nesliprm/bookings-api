import prisma from "../../lib/prisma.js";

const updateBookingById = async (id, updatedBooking) => {
  return prisma.booking.update({
    where: { id },
    data: { ...updatedBooking },
  });
};

export default updateBookingById;
