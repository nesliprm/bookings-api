import prisma from "../../lib/prisma.js";

const getBookingById = async (id) => {
  return prisma.booking.findUnique({
    where: { id },
  });
};

export default getBookingById;
