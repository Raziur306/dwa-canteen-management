import React, { useCallback, useEffect, useMemo, useState } from "react";
import CartItemCard from "./CartItemCard";
import {
  CartTableStyles,
  CartTitleTextStyle,
} from "@/styled/cart.pageStyles/CartPageStyles";
import { CartCheckoutBtnStyle } from "../../styled/cart.pageStyles/CartPageStyles";
import { cookies } from "@/config/cookies";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const CartSection = () => {
  const token = cookies.get("user_token");
  const [cartData, setCartData] = useState([]);
  const router = useRouter();

  const totalAmount = useMemo(() => {
    let total = 0;
    cartData.forEach((item) => {
      total += item.FoodItem.price * item.quantity;
    });

    return total;
  }, [cartData]);

  const getCartData = async () => {
    console.log("Called");
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

  const handleCheckout = async () => {
    try {
      const checkoutCall = () =>
        fetch(`/api/place-order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ subTotal: totalAmount }),
        });

      await toast.promise(checkoutCall(), {
        loading: <b>Placing order..</b>,
        success: (res) => {
          if (res.status == 301) {
            router.push("/profile");
            throw new Error("Complete your profile!");
          } else if (!res.ok) {
            throw new Error("Something went wrong");
          }
          onChange();
          return <b>Order placed successfully!</b>;
        },
        error: (err) => <b>{err.toString()}</b>,
      });
    } catch (error) {
      console.log("Checkout error", error);
    }
  };

  return (
    <div className="mb-10">
      <CartTitleTextStyle>My Meal Cart</CartTitleTextStyle>
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
                  colSpan={1}
                  className="text-center p-4 text-xl font-medium"
                ></td>
                <td className="text-center p-4 text-xl font-medium">
                  <div className="flex flex-row gap-1 items-center">
                    <input checked className="w-1 h-4" type="radio" />
                    <label className="text-sm">Cash On Delivery</label>
                  </div>
                </td>
                <td colSpan={2} className="text-center p-5">
                  <CartCheckoutBtnStyle onClick={handleCheckout}>
                    Checkout
                  </CartCheckoutBtnStyle>
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
