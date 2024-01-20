import React from "react";
import { SharedLayout } from "@/layout";
import { NavBar, Footer } from "@/components/shared";
import CartSection from "../components/cart.page/CartSection";
const Cart = () => {
  return (
    <SharedLayout title="Cart" navBar={<NavBar />} footer={<Footer />}>
      <CartSection />
    </SharedLayout>
  );
};

export default Cart;
