import { prisma } from "@/lib";

const getFoodItem = async (req, res) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Something went wrong" });
    }

    const items = await prisma.FoodItem.findMany({});

    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.toString() });
  }
};

export default getFoodItem;
