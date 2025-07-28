import prisma from "../../lib/prisma.js";

const getHostById = async (id) => {
  return prisma.host.findUnique({
    where: { id },
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

export default getHostById;
