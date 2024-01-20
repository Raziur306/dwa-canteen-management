import { SideBar, UsersListSection } from "@/components/admin.pages";
import React from "react";

const UsersList = () => {
  return (
    <SideBar topBarTitle="Users List">
      <UsersListSection />
    </SideBar>
  );
};

export default UsersList;
