import { FoodItemsSectionContainer } from "@/styled/landing.pageStyles";
import React from "react";
import { FoodCard } from ".";

const foodItems = [
  {
    title: "Pizza",
    subTitle: "Pizza with extra cheese",
    image:
      "https://images.freeimages.com/images/large-previews/067/italian-piza-1321147.jpg",
    price: 100,
  },
  {
    title: "Pizza",
    subTitle: "Pizza with extra cheese",
    image:
      "https://images.freeimages.com/images/large-previews/067/italian-piza-1321147.jpg",
    price: 100,
  },
  {
    title: "Pizza",
    subTitle: "Pizza with extra cheese",
    image:
      "https://images.freeimages.com/images/large-previews/067/italian-piza-1321147.jpg",
    price: 100,
  },
  {
    title: "Pizza",
    subTitle: "Pizza with extra cheese",
    image:
      "https://images.freeimages.com/images/large-previews/067/italian-piza-1321147.jpg",
    price: 100,
  },
  {
    title: "Pizza",
    subTitle: "Pizza with extra cheese",
    image:
      "https://images.freeimages.com/images/large-previews/067/italian-piza-1321147.jpg",
    price: 100,
  },
  {
    title: "Pizza",
    subTitle: "Pizza with extra cheese",
    image:
      "https://images.freeimages.com/images/large-previews/067/italian-piza-1321147.jpg",
    price: 100,
  },
];

const FoodItems = () => {
  return (
    <FoodItemsSectionContainer id="foods">
      <h1>Available Items</h1>
      <div className="grid grid-cols-4 gap-10 mt-12">
        {foodItems.map((item, index) => {
          const { title, subTitle, image, price } = item;
          return (
            <FoodCard
              title={title}
              subTitle={subTitle}
              image={image}
              price={price}
              key={index}
            />
          );
        })}
      </div>
    </FoodItemsSectionContainer>
  );
};

export default FoodItems;
