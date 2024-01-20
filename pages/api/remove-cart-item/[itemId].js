import { tokenDecoder } from "@/utils";
import { prisma } from "@/lib";

const removeCartItem = async (req, res) => {
  try {
    if (req.method !== "DELETE") {
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

    await prisma.cart.delete({
      where: {
        id: itemId,
        userId: existUser.id,
      },
    });

    res.status(201).json({ message: "Successful" });
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

export default removeCartItem;
