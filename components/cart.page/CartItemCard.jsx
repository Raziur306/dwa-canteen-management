import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  CartDecreaseBtn,
  CartIncreaseBtn,
} from "@/styled/cart.pageStyles/CartPageStyles";
import { CartItemRemoveBtn } from "@/styled/cart.pageStyles/CartPageStyles";
import { cookies } from "@/config/cookies";
import { toast } from "react-hot-toast";

const CartItemCard = ({
  id,
  title,
  image,
  price,
  desc,
  quantity,
  onChange,
}) => {
  const quantityLimit = 5;
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const token = cookies.get("user_token");

  const handleIncrement = () => {
    if (quantityLimit > itemQuantity) {
      const updatedQuantity = itemQuantity + 1;
      setItemQuantity(updatedQuantity);
      updateCartCall(updatedQuantity);
    }
  };
  const handleDecrement = async () => {
    if (itemQuantity > 1) {
      const updatedQuantity = itemQuantity - 1;
      setItemQuantity(updatedQuantity);
      updateCartCall(updatedQuantity);
    }
  };

  const updateCartCall = async (updatedQuantity) => {
    try {
      const updateQuantity = () =>
        fetch(`/api/update-cart-item/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ itemQuantity: updatedQuantity }),
        });
      await toast.promise(updateQuantity(), {
        loading: <b>Updating...</b>,
        success: (res) => {
          if (!res.ok) {
            throw new Error("Something went wrong!");
          }
          onChange();
          return <b>Updated!</b>;
        },
        error: (err) => <b>{err.toString()}</b>,
      });
    } catch (error) {
      console.log("Cart update error", error);
    }
  };

  const handleRemoveItem = async () => {
    try {
      const removeCall = () =>
        fetch(`/api/remove-cart-item/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
      await toast.promise(removeCall(), {
        loading: <b>Removing item...</b>,
        success: (res) => {
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          onChange();
          return <b>Removed Successfully!</b>;
        },
        error: (err) => <b>{err.toString()}</b>,
      });
    } catch (error) {
      console.log("Remove item error", error);
    }
  };

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
          <CartIncreaseBtn onClick={handleIncrement}>+</CartIncreaseBtn>
          <input disabled value={itemQuantity} />
          <CartDecreaseBtn onClick={handleDecrement}>-</CartDecreaseBtn>
        </div>
      </td>
      <td className="text-center">
        <CartItemRemoveBtn onClick={handleRemoveItem}>X</CartItemRemoveBtn>
      </td>
      <td className="text-center">{price} Tk</td>
    </tr>
  );
};

export default CartItemCard;
