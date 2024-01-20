import { AddToCartBtn, FoodCardContainer } from "@/styled/landing.pageStyles";
import React from "react";
import Image from "next/image";
import { StockOutBtn } from "@/styled/landing.pageStyles/FoodCardStyles";
import { cookies } from "@/config/cookies";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const FoodCard = ({ id, image, title, price, desc, status }) => {
  const token = cookies.get("user_token");
  const router = useRouter();

  const handleAddCart = async () => {
    if (!token) {
      toast.error("Please login first..");
      return router.push("/login");
    }
    try {
      const addCartCall = () =>
        fetch(`/api/add-cart/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

      await toast.promise(addCartCall(), {
        loading: <b>Adding into cart..</b>,
        success: (res) => {
          if (res.status == 409) {
            throw new Error("Already exist!");
          } else if (!res.ok) {
            throw new Error("Something went wrong");
          }
          return <b>Product added into cart!</b>;
        },
        error: (err) => <b>{err.toString()}</b>,
      });
    } catch (error) {
      console.log("Add into cart error", error);
    }
  };

  return (
    <FoodCardContainer>
      <Image
        width={500}
        height={300}
        src={image}
        className="object-fit min-h-[300px]"
        alt={title}
      />
      <div className="p-3">
        <h1>{title}</h1>
        <p>{desc}</p>
        <div className="flex flex-row justify-between">
          <p>{price} Tk</p>
          {status === "available" && (
            <AddToCartBtn onClick={handleAddCart}>Add to Cart</AddToCartBtn>
          )}
          {status !== "available" && <StockOutBtn>Stock Out</StockOutBtn>}
        </div>
      </div>
    </FoodCardContainer>
  );
};

export default FoodCard;
