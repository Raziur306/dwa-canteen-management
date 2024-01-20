import { AvailableItemsSection, SideBar } from "@/components/admin.pages";
import {
  PendingAndRequestPageContainer,
  PendingPageMenuWrapper,
} from "@/styled/admin.pageStyles";
import { useState } from "react";

const ProductList = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  return (
    <SideBar topBarTitle={"Food Items"}>
      <PendingAndRequestPageContainer>
        <PendingPageMenuWrapper>
          <li
            onClick={() => handleMenuClick(0)}
            className={`${selectedMenu == 0 ? "active" : ""}`}
          >
            Available Items
          </li>
        </PendingPageMenuWrapper>
        <AvailableItemsSection />
      </PendingAndRequestPageContainer>
    </SideBar>
  );
};

export default ProductList;
