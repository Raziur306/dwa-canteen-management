import { prisma } from "@/lib";
import { tokenDecoder } from "@/utils";

const getAllUserList = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Something went wrong" });
    }
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const { role } = await tokenDecoder(token);
    if (role !== "admin") {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const userLIst = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
      },
      where: {
        role: {
          not: "admin",
        },
      },
    });

    res.status(200).json(userLIst);
  } catch (error) {
    console.log(error);
  }
};

export default getAllUserList;
