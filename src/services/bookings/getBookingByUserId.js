import prisma from "../../lib/prisma.js";

const getBookingByUserId = async (userId) => {
  return prisma.booking.findMany({
    where: { userId },
  });
};

export default getBookingByUserId;
