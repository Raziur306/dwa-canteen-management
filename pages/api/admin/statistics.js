import { prisma } from "@/lib";
import { tokenDecoder } from "@/utils";

const getStatistics = async (req, res) => {
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

    const userCount = await prisma.user.count();
    const orderCount = await prisma.order.count();
    const itemCount = await prisma.FoodItem.count();
    const totalSell = await prisma.FoodItem.count();

    res.status(200).json({
      users: userCount,
      orders: orderCount,
      item: itemCount,
      totalSell: totalSell,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default getStatistics;
