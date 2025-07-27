import prisma from "../../lib/prisma.js";

const getUsers = async () => {
  return prisma.user.findMany({});
};

export default getUsers;
