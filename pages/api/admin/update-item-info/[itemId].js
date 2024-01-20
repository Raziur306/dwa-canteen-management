import { prisma } from "@/lib";
import { tokenDecoder } from "@/utils";

const updateItem = async (req, res) => {
  try {
    if (req.method !== "PUT") {
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
    const { itemId } = req.query;
    const { title, desc, image, price } = req.body;
    await prisma.foodItem.update({
      where: {
        id: itemId,
      },
      data: {
        title,
        image,
        desc,
        price,
      },
    });

    res.status(201).json({ message: "Item info updated successfully" });
  } catch (error) {
    console.log(error);
  }
};

export default updateItem;
