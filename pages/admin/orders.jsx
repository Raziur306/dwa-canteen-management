import { SideBar } from "@/components/admin.pages";
import {
  PendingAndRequestPageContainer,
  PendingPageMenuWrapper,
} from "@/styled/admin.pageStyles";
import { useState } from "react";

const Orders = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  return (
    <SideBar topBarTitle={"Orders"}>
      <PendingAndRequestPageContainer>
        <PendingPageMenuWrapper>
          <li
            onClick={() => handleMenuClick(0)}
            className={`${selectedMenu == 0 ? "active" : ""}`}
          >
            All Orders
          </li>
          <li
            onClick={() => handleMenuClick(1)}
            className={`${selectedMenu == 1 ? "active" : ""}`}
          >
            Pending Orders
          </li>
          <li
            onClick={() => handleMenuClick(2)}
            className={`${selectedMenu == 2 ? "active" : ""}`}
          >
            Canceled Orders
          </li>
        </PendingPageMenuWrapper>
        {/* {selectedMenu == 0 && <AllBooksSection />}
        {selectedMenu == 1 && <PendingBooksSection />}
        {selectedMenu == 2 && <ApprovedBooks />} */}
      </PendingAndRequestPageContainer>
    </SideBar>
  );
};

export default Orders;
