import React from "react";
import { SharedLayout } from "@/layout";
import { NavBar, Footer } from "@/components/shared";
import { MyOrderSection } from "@/components/myOrder.page";
const MyOrder = () => {
  return (
    <SharedLayout title={"My Order"} navBar={<NavBar />} footer={<Footer />}>
      <MyOrderSection />
    </SharedLayout>
  );
};

export default MyOrder;
