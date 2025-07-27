import prisma from "../../lib/prisma.js";

const updateReviewById = async (id, updatedReview) => {
  return prisma.review.update({
    where: { id },
    data: { ...updatedReview },
  });
};

export default updateReviewById;
