import prisma from "../../lib/prisma.js";

const updateReviewById = async (id, updatedReview) => {
  try {
    return await prisma.review.update({
      where: { id },
      data: { ...updatedReview },
    });
  } catch (error) {
    return null;
  }
};

export default updateReviewById;
