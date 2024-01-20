import React, { useEffect, useState } from "react";
import { DashboardCardContainer } from "@/styled/admin.pageStyles";
import { cookies } from "@/config/cookies";

const StatisticsCards = () => {
  const token = cookies.get("user_token");
  const [statisticInfo, setStatisticInfo] = useState({});

  const fetchCall = async () => {
    try {
      const res = await fetch(`/api/admin/statistics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setStatisticInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCall();
  }, []);
  return (
    <div className="grid gird-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      <DashboardCardContainer>
        <div className="flex flex-col">
          <h2>Total Items</h2>
        </div>
        <h3>{statisticInfo?.item}</h3>
      </DashboardCardContainer>
      <DashboardCardContainer>
        <div className="flex flex-col">
          <h2>Total Orders</h2>
        </div>
        <h3>{statisticInfo?.orders}</h3>
      </DashboardCardContainer>
      <DashboardCardContainer>
        <div className="flex flex-col">
          <h2>Total Users</h2>
        </div>
        <h3>{statisticInfo?.users}</h3>
      </DashboardCardContainer>
      <DashboardCardContainer>
        <div className="flex flex-col">
          <h2>Total Sell</h2>
        </div>
        <h3>{statisticInfo?.totalSell} Tk</h3>
      </DashboardCardContainer>
    </div>
  );
};

export default StatisticsCards;
