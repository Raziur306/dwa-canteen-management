import { RegistrationSection } from "@/components/registration.page";
import { Footer, NavBar } from "@/components/shared";
import { SharedLayout } from "@/layout";
import React from "react";

const Registration = () => {
  return (
    <SharedLayout
      title={"Registration"}
      navBar={<NavBar />}
      footer={<Footer />}
    >
      <RegistrationSection />
    </SharedLayout>
  );
};

export default Registration;
