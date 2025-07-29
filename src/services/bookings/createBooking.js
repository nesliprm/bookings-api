import prisma from "../../lib/prisma.js";
import { differenceInDays } from "date-fns";

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests
) => {
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  });

  if (!property) {
    throw new Error("Property not found.");
  }

  const stayLength = differenceInDays(
    new Date(checkoutDate),
    new Date(checkinDate)
  );
  const totalPrice = stayLength * property.pricePerNight;

  return prisma.booking.create({
    data: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
    },
  });
};

export default createBooking;
