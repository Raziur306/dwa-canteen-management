"use client";
import {
  AdminTopBar,
  RecentOrdersCard,
  RecentUserCard,
  SideBar,
  StatisticsCards,
} from "@/components/admin.pages";

import React from "react";
import ArrowTop from "@/public/arrowTop";

const Dashboard = () => {
  return (
    <SideBar topBarTitle="Dashboard">
      <StatisticsCards />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <RecentOrdersCard />
        <RecentUserCard />
      </div>
    </SideBar>
  );
};

export default Dashboard;
