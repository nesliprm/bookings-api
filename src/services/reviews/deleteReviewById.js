import prisma from "../../lib/prisma.js";

const deleteReviewById = async (id) => {
  return prisma.review.delete({
    where: { id },
  });
};

export default deleteReviewById;
