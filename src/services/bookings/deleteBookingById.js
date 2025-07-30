import prisma from "../../lib/prisma.js";

const deleteBookingById = async (id) => {
  try {
    return await prisma.booking.delete({
      where: { id },
    });
  } catch (error) {}
};

export default deleteBookingById;
