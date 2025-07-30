import prisma from "../../lib/prisma.js";

const deleteReviewById = async (id) => {
  try {
    return await prisma.review.delete({ where: { id } });
  } catch (error) {
    return null;
  }
};

export default deleteReviewById;
