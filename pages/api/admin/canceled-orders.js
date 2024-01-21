import { prisma } from "@/lib";
import { tokenDecoder } from "@/utils";

const getCanceledOrders = async (req, res) => {
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

    const orders = await prisma.Order.findMany({
      where: {
        status: "cancelled",
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        User: {
          select: {
            name: true,
            phone: true,
            email: true,
            address: true,
          },
        },
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default getCanceledOrders;
