import prisma from "../../lib/prisma.js";

const updateBookingById = async (id, updatedBooking) => {
  try {
    return await prisma.booking.update({
      where: { id },
      data: { ...updatedBooking },
    });
  } catch (error) {
    return null;
  }
};

export default updateBookingById;
