import React, { useEffect, useMemo, useState } from "react";
import CartItemCard from "./CartItemCard";
import {
  CartTableStyles,
  CartTitleTextStyle,
} from "@/styled/cart.pageStyles/CartPageStyles";
import { CartCheckoutBtnStyle } from "../../styled/cart.pageStyles/CartPageStyles";
import { cookies } from "@/config/cookies";

const CartSection = () => {
  const token = cookies.get("user_token");
  const [cartData, setCartData] = useState([]);

  const totalAmount = useMemo(() => {
    let total = 0;
    cartData.forEach((item) => {
      total += item.FoodItem.price;
    });

    return total;
  }, [cartData]);

  const getCartData = async () => {
    try {
      const res = await fetch("/api/cart-item", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (res.ok) {
        setCartData(await res.json());
      }
    } catch (error) {
      console.log("Fetching item into cart error", error);
    }
  };

  const onChange = () => {
    getCartData();
  };

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <div className="mb-10">
      <CartTitleTextStyle>My Shopping Cart</CartTitleTextStyle>
      <div className="min-h-[60vh]">
        {cartData.length > 0 && (
          <CartTableStyles className="w-4/6 m-auto">
            <thead>
              <tr>
                <th>Description</th>
                <th className="text-start">Quantity</th>
                <th>Remove</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartData.map((item, index) => {
                const { title, desc, price, image } = item.FoodItem;
                const { id, quantity } = item;
                return (
                  <CartItemCard
                    id={id}
                    image={image}
                    title={title}
                    desc={desc}
                    quantity={quantity}
                    price={price}
                    key={index}
                    onChange={onChange}
                  />
                );
              })}
              <tr>
                <td colSpan={3} className="text-center p-4 text-xl font-medium">
                  Sub Total
                </td>
                <td className="text-center">{totalAmount} Tk</td>
              </tr>
              <tr>
                <td
                  colSpan={2}
                  className="text-center p-4 text-xl font-medium"
                ></td>
                <td colSpan={2} className="text-center p-5">
                  <CartCheckoutBtnStyle>Checkout</CartCheckoutBtnStyle>
                </td>
              </tr>
            </tbody>
          </CartTableStyles>
        )}
        {cartData.length == 0 && (
          <p className="text-center items-center text-xl font-medium text-gray-400">
            No Data Found
          </p>
        )}
      </div>
    </div>
  );
};

export default CartSection;
