import { useState } from "react";
import { cookies } from "@/config/cookies";
const { createContext } = require("react");

export const CommonApiContext = createContext({});

export const CommonAPiContextProvider = ({ children }) => {
  const token = cookies.get("user_token");
  const [profileInfo, setProfileInfo] = useState();

  const fetchProfileInfo = async () => {
    try {
      const res = await fetch("/api/user-info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setProfileInfo(await res.json());
      }
    } catch (error) {
      console.log("Fetching profile info error");
    }
  };

  return (
    <CommonApiContext.Provider value={{profileInfo, fetchProfileInfo}}>
      {children}
    </CommonApiContext.Provider>
  );
};
