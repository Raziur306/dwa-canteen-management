import { NavBarContainer, NavBarMenuWrapper } from "@/styled/sharedStyles";
import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <NavBarContainer>
      <Link href={"/"}>
        <h1>DWA Canteen</h1>
      </Link>
      <NavBarMenuWrapper>
        <Link href={"/"}>Home</Link>
        <Link href={"/My Order"}>My Order</Link>
        <Link href={"/Cart"}>Cart</Link>
        <Link href={"/Profile"}>Profile</Link>
        <Link href={"/Login"}>Login</Link>
      </NavBarMenuWrapper>
    </NavBarContainer>
  );
};

export default NavBar;
