import prisma from "../../lib/prisma.js";

const getHostByName = async (name) => {
  return prisma.host.findMany({
    where: { name },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
      aboutMe: true,
    },
  });
};

export default getHostByName;
