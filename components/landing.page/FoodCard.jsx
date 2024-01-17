import { AddToCartBtn, FoodCardContainer } from "@/styled/landing.pageStyles";
import React from "react";

const FoodCard = ({ image, title, price, subTitle }) => {
  return (
    <FoodCardContainer>
      <img src={image} />
      <div className="p-3">
        <h1>{title}</h1>
        <p>{subTitle}</p>
        <div className="flex flex-row justify-between">
          <p>{price} Tk</p>
          <AddToCartBtn>Add to Cart</AddToCartBtn>
        </div>
      </div>
    </FoodCardContainer>
  );
};

export default FoodCard;
