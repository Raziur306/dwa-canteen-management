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
        <Link href={"/my-order"}>My Order</Link>
        <Link href={"/cart"}>Cart</Link>
        <Link href={"/profile"}>Profile</Link>
        <Link href={"/login"}>Login</Link>
      </NavBarMenuWrapper>
    </NavBarContainer>
  );
};

export default NavBar;
