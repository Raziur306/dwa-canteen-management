import React, { useContext, useEffect, useState } from "react";
import Dashboard from "@/public/dashboard";
import {
  MenuItemLogoutStyle,
  MenuItemWrapper,
  PersonInfoContainer,
} from "@/styled/admin.pageStyles";
import Logout from "@/public/logout";
import Box from "@/public/box";
import CheckedBox from "@/public/checkedBox";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AdminTopBar } from ".";
import { cookies } from "@/config/cookies";
import Group from "@/public/group";

const SideBar = ({ children, topBarTitle }) => {
  const token = cookies.get("user_token");
  const path = usePathname();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await fetch("/api/user-info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUserInfo(data);
        }
      } catch (error) {
        console.log("Fetching admin info error", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleLogoutClick = async () => {
    cookies.remove("user_token");
    router.refresh();
  };

  return (
    <div className="w-full h-full flex flex-row">
      <div className="bg-white  w-[20%] min-w-[250px]">
        <div className=" flex-col w-[40%] xl:w-[15%] gap-5 ml-3 mr-4 hidden md:flex fixed">
          <PersonInfoContainer>
            <Image
              width={50}
              height={50}
              className="rounded-full"
              alt="Admin Profile"
              src={userInfo?.image || "/default.jpg"}
            />
            <span>{userInfo?.name}</span>
          </PersonInfoContainer>

          <Link href={"/admin"}>
            <MenuItemWrapper className={`${path == "/admin" ? "active" : ""}`}>
              <Dashboard />
              <span>Dashboard</span>
            </MenuItemWrapper>
          </Link>
          <Link href={"/admin/orders"}>
            <MenuItemWrapper
              className={`${path?.includes("/admin/orders") ? "active" : ""}`}
            >
              <CheckedBox />
              <span>Orders</span>
            </MenuItemWrapper>
          </Link>
          <Link href={"/admin/food-item"}>
            <MenuItemWrapper
              className={`${
                path?.includes("/admin/food-item") ? "active" : ""
              }`}
            >
              <Box />
              <span>Food Item</span>
            </MenuItemWrapper>
          </Link>
          <Link href={"/admin/users-list"}>
            <MenuItemWrapper
              className={`${
                path?.includes("/admin/users-list") ? "active" : ""
              }`}
            >
              <Group />
              <span>Users List</span>
            </MenuItemWrapper>
          </Link>
          <MenuItemLogoutStyle onClick={handleLogoutClick}>
            <Logout />
            <span>Log out</span>
          </MenuItemLogoutStyle>
        </div>
      </div>
      <div className="w-full h-full min-h-screen bg-[#DEEAEB] p-5 xl:p-10 flex flex-col gap-10">
        <AdminTopBar title={topBarTitle} />
        {children}
      </div>
    </div>
  );
};

export default SideBar;
