import { FoodItemsSectionContainer } from "@/styled/landing.pageStyles";
import React, { useEffect, useState } from "react";
import { FoodCard } from ".";

const FoodItems = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const getItemsCall = async () => {
      try {
        const res = await fetch("/api/food-items", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          setFoodItems(await res.json());
        }
      } catch (error) {
        console.log("Getting food item error", error);
      }
    };
    getItemsCall();
  }, []);

  return (
    <FoodItemsSectionContainer id="foods">
      <h1>Available Items</h1>
      <div className="grid grid-cols-4 gap-10 mt-12">
        {foodItems.map((item, index) => {
          const { id, title, desc, image, price, status } = item;
          return (
            <FoodCard
              id={id}
              title={title}
              desc={desc}
              image={image}
              price={price}
              key={index}
              status={status}
            />
          );
        })}
      </div>
    </FoodItemsSectionContainer>
  );
};

export default FoodItems;
