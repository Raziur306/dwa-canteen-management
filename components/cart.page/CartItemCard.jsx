import React from "react";
import Image from "next/image";
import {
  CartDecreaseBtn,
  CartIncreaseBtn,
} from "@/styled/cart.pageStyles/CartPageStyles";
import { CartItemRemoveBtn } from "@/styled/cart.pageStyles/CartPageStyles";

const CartItemCard = ({ title, image, price, desc, quantity }) => {
  return (
    <tr className="border-y">
      <td className="flex flex-row gap-3 p-5 items-center">
        <Image src={image} width={80} height={80} alt={title} />
        <div>
          <h1>{title}</h1>
          <p>{desc}</p>
        </div>
      </td>
      <td>
        <div className="flex flex-row">
          <CartIncreaseBtn>+</CartIncreaseBtn>
          <input value={quantity} />
          <CartDecreaseBtn>-</CartDecreaseBtn>
        </div>
      </td>
      <td className="text-center">
        <CartItemRemoveBtn>X</CartItemRemoveBtn>
      </td>
      <td className="text-center">{price} Tk</td>
    </tr>
  );
};

export default CartItemCard;
