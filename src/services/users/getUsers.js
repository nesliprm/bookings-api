import prisma from "../../lib/prisma.js";

const getUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      pictureUrl: true,
    },
  });
};

export default getUsers;
