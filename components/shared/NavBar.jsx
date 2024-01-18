import { NavBarContainer, NavBarMenuWrapper } from "@/styled/sharedStyles";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cookies } from "@/config/cookies";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const token = cookies.get("user_token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = async () => {
    await cookies.remove("user_token");
    router.refresh();
  };

  useEffect(() => {
    if (cookies) {
      return setIsLoggedIn(true);
    }
    setIsLoggedIn(false);
  }, [cookies]);

  return (
    <NavBarContainer>
      <Link href={"/"}>
        <h1>DWA Canteen</h1>
      </Link>
      <NavBarMenuWrapper>
        <Link href={"/"}>Home</Link>
        <Link href={"/my-order"}>My Order</Link>
        <Link href={"/cart"}>Cart</Link>
        {!isLoggedIn && <Link href={"/profile"}>Profile</Link>}
        {!isLoggedIn && <Link href={"/login"}>Login</Link>}
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      </NavBarMenuWrapper>
    </NavBarContainer>
  );
};

export default NavBar;
