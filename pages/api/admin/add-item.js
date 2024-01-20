import { prisma } from "@/lib";
import { tokenDecoder } from "@/utils";

const addNewItem = async (req, res) => {
  try {
    if (req.method !== "POST") {
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
    await prisma.foodItem.create({
      data: {
        ...req.body,
      },
    });

    res.status(201).json({ message: "Item added successfully" });
  } catch (error) {
    console.log(error);
  }
};

export default addNewItem;
