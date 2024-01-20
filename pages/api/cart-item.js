import React from "react";
import { tokenDecoder } from "@/utils";
import { prisma } from "@/lib";

const getCartItem = async (req, res) => {
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
    const cartList = await prisma.cart.findMany({
      where: {
        userId: existUser.id,
      },
      include: {
        FoodItem: true,
      },
    });
    res.status(200).json(cartList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.toString() });
  }
};

export default getCartItem;
