import React from "react";
import { SharedLayout } from "@/layout";
import { NavBar, Footer } from "@/components/shared";
import { ProfilePageSection } from "@/components/profile.page";
const Profile = () => {
  return (
    <SharedLayout title="Profile" navBar={<NavBar />} footer={<Footer />}>
      <ProfilePageSection />
    </SharedLayout>
  );
};

export default Profile;
