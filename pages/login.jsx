import { LoginSection } from "@/components/login.page";
import { Footer, NavBar } from "@/components/shared";
import { SharedLayout } from "@/layout";
import React from "react";

const Login = () => {
  return (
    <SharedLayout title={"Login"} footer={<Footer />} navBar={<NavBar />}>
      <LoginSection />
    </SharedLayout>
  );
};

export default Login;
