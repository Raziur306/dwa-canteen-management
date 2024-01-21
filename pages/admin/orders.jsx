import { SideBar } from "@/components/admin.pages";
import {
  PendingAndRequestPageContainer,
  PendingPageMenuWrapper,
} from "@/styled/admin.pageStyles";
import { useState } from "react";
import {
  AllOrdersSection,
  PendingOrdersSection,
  CancelledOrdersSection,
  DeliveredOrdersSection,
} from "@/components/admin.pages";

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
          <li
            onClick={() => handleMenuClick(3)}
            className={`${selectedMenu == 3 ? "active" : ""}`}
          >
            Delivered Orders
          </li>
        </PendingPageMenuWrapper>
        {selectedMenu == 0 && <AllOrdersSection />}
        {selectedMenu == 1 && <PendingOrdersSection />}
        {selectedMenu == 2 && <CancelledOrdersSection />}
        {selectedMenu == 3 && <DeliveredOrdersSection />}
      </PendingAndRequestPageContainer>
    </SideBar>
  );
};

export default Orders;
