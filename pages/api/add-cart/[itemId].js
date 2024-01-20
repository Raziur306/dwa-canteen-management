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

    const { email: tokenEmail } = await tokenDecoder(token);

    const existUser = await prisma.user.findFirst({
      where: {
        email: tokenEmail,
      },
    });

    if (!existUser) {
      res.status(404).json({ message: "User not exist" });
    }

    const { itemId } = req.query;
    const isProductExist = await prisma.cart.findFirst({
      where: {
        userId: existUser.id,
        itemId: itemId,
      },
    });

    if (isProductExist) {
      return res.status(409).json({ message: "Product already exist" });
    }

    await prisma.cart.create({
      data: {
        userId: existUser.id,
        itemId: itemId,
      },
    });

    return res.status(201).json({ message: "Product added into cart" });
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

export default addNewItem;
