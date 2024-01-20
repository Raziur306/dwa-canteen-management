import React from "react";
import { tokenDecoder } from "@/utils";
import { prisma } from "@/lib";

const placeOrder = async (req, res) => {
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

    if (!existUser.address || !existUser.phone || !existUser.name) {
      res.status(301).json({ message: "Complete your profile first" });
    }

    const cartList = await prisma.cart.findMany({
      where: {
        userId: existUser.id,
      },
      include: {
        FoodItem: true,
      },
    });

    const foodItemsData = await cartList.map((cartItem, index) => ({
      id: (index + 1).toString(),
      title: cartItem.FoodItem.title,
      desc: cartItem.FoodItem.desc,
      image: cartItem.FoodItem.image,
      price: cartItem.FoodItem.price,
      quantity: cartItem.quantity,
    }));

    const { subTotal } = req.body;

    const data = await prisma.order.create({
      data: {
        userId: existUser.id,
        subTotal,
        items: foodItemsData,
      },
    });

    await prisma.cart.deleteMany({
      where: {
        userId: existUser.id,
      },
    });

    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.toString() });
  }
};

export default placeOrder;
