import { cookies } from "@/config/cookies";
import {
  LargeCardContainer,
  LargeCardSubContainer,
} from "@/styled/admin.pageStyles";
import { formatTimeDistance } from "@/utils";
import React, { useEffect, useState } from "react";

const RecentBooksCard = () => {
  const [recentOrders, setRecentOrders] = useState([]);
  const token = cookies.get("user_token");

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setRecentOrders(await res.json());
        }
      } catch (error) {
        console.log("Recent book list error", error);
      }
    };

    fetchRecentOrders();
  }, []);

  const visibleOrders = recentOrders.slice(0, 5);

  return (
    <LargeCardContainer>
      <h2>Recent Orders</h2>
      {visibleOrders?.map((item, index) => {
        const { createdAt, subTotal } = item;
        return (
          <LargeCardSubContainer key={index}>
            <div className="flex flex-row justify-between">
              <h3 className={`${index == 0 ? "active" : ""}`}>
                New Order Placed
              </h3>
              <h4>{formatTimeDistance(createdAt)}</h4>
            </div>
            <p>
              {item.User.name} Placed order of <span>{subTotal} Tk</span>
            </p>
          </LargeCardSubContainer>
        );
      })}
      {(!recentOrders || recentOrders.length == 0) && (
        <span className="text-center m-auto">No Data Found</span>
      )}
    </LargeCardContainer>
  );
};

export default RecentBooksCard;
