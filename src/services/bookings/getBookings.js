import prisma from "../../lib/prisma.js";

const getBookings = async () => {
  return prisma.booking.findMany({});
};

export default getBookings;
