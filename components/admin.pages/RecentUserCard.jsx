import { cookies } from "@/config/cookies";
import {
  LargeCardContainer,
  RecentUserWrapper,
} from "@/styled/admin.pageStyles";
import { formatTimeDistance } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const RecentUserCard = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = cookies.get("user_token");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const userCall = async () => {
      try {
        const res = await fetch(`/api/admin/user-list`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          console.log(res);
          setUserList(await res.json());
        }
      } catch (error) {
        console.log("Fetching user error", error);
      }
    };
    userCall();
  }, []);

  const visibleUsers = userList.slice(0, 5);

  return (
    <LargeCardContainer>
      <h2>Recent Users</h2>
      {visibleUsers.map((item, index) => {
        const isLastItem = index === visibleUsers.length - 1;
        const { name, image, createdAt } = item;
        return (
          <RecentUserWrapper key={index} $isLastItem={isLastItem}>
            <div className="flex flex-row gap-5 items-center">
              <Image
                width={36}
                height={36}
                className="rounded-full"
                alt="Recent User"
                src={image || "/default.jpg"}
              />
              <h4>{name}</h4>
            </div>
            <span>{formatTimeDistance(createdAt)}</span>
          </RecentUserWrapper>
        );
      })}
      {(!userList || userList.length == 0) && (
        <span className="text-center m-auto">No Data Found</span>
      )}
    </LargeCardContainer>
  );
};

export default RecentUserCard;
