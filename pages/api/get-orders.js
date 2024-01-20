import { prisma } from "@/lib";
import { tokenDecoder } from "@/utils";
const getOrders = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Something went wrong" });
    }
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const { email: tokenEmail } = await tokenDecoder(token);

    const existUser = await prisma.user.findFirst({
      where: {
        email: tokenEmail,
      },
    });

    if (!existUser) {
      res.status(404).json({ message: "User not exist" });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: existUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

export default getOrders;
