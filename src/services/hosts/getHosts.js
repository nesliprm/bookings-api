import prisma from "../../lib/prisma.js";

const getHosts = async () => {
  return prisma.host.findMany({
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

export default getHosts;
