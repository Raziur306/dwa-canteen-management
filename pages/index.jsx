import { FoodItems, HeroSection } from "@/components/landing.page";
import { Footer, NavBar } from "@/components/shared";
import SharedLayout from "@/layout/SharedLayout";
import React from "react";

const Home = () => {
  return (
    <SharedLayout title={"Home"} navBar={<NavBar />} footer={<Footer />}>
      <HeroSection />
      <FoodItems />
    </SharedLayout>
  );
};

export default Home;
