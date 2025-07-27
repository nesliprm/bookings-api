import prisma from "../../lib/prisma.js";

const getReviewById = async (id) => {
  return prisma.review.findUnique({
    where: { id },
  });
};

export default getReviewById;
