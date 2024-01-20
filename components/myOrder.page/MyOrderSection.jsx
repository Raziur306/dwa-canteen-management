import React, { useEffect, useState } from "react";
import {
  MyOrderTitleText,
  StyledTableContainer,
} from "@/styled/myOrder.pageStyles/MyOrderStyles";
import { cookies } from "@/config/cookies";
import { OrderCard } from ".";
import { SubTotal, dateFormatter } from "@/utils";
const MyOrderSection = () => {
  const [orderData, setOrderData] = useState([]);
  const token = cookies.get("user_token");

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await fetch("/api/get-orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          setOrderData(await res.json());
        }
      } catch (error) {
        console.log("Get Orders error", error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="mb-10 min-h-[65vh]">
      <div className="w-[70%] m-auto flex flex-col  gap-10">
        <MyOrderTitleText>My Orders</MyOrderTitleText>
        {orderData.map((order, index) => {
          return (
            <>
              <div>
                <h1>
                  Order ID : <span>{order.id}</span>
                </h1>
                <h1>
                  Placed : <span>{dateFormatter(order.createdAt)}</span>
                </h1>
              </div>
              <StyledTableContainer>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map(({ title, price, quantity }, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center w-20">{index + 1}</td>
                        <td className="w-96">{title}</td>
                        <td className="text-center ">{quantity}</td>
                        <td className="text-center">
                          {quantity} X {price} Tk
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan={3} className="text-center font-bold">
                      Status
                    </td>
                    <td className={`text-center ${order.status}`}>
                      {order.status}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="text-center font-bold">
                      Total Sum / COD
                    </td>
                    <td className="text-center font-bold">
                      {SubTotal(order.items)} Tk
                    </td>
                  </tr>
                </tbody>
              </StyledTableContainer>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrderSection;
