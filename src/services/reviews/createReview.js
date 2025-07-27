import prisma from "../../lib/prisma.js";

const createReview = async (userId, propertyId, rating, comment) => {
  return prisma.review.create({
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });
};

export default createReview;
