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

    const { role } = await tokenDecoder(token);
    if (role !== "admin") {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default getOrders;
