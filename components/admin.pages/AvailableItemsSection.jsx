import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../shared";
import { ItemsInDetailsTable } from "@/styled/admin.pageStyles";
import Image from "next/image";
import { dateFormatter } from "@/utils";
import { cookies } from "@/config/cookies";
import {
  DeleteItemModal,
  ViewItemDetailsModal,
  UpdateItemStatusModal,
  AddNewProductModal,
} from ".";

const AvailableItemsSection = () => {
  const token = cookies.get("user_token");
  const [itemList, setItemList] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOPen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState();
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
  const [isViewItemModalOpen, setIsViewItemModalOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [isAddNewProductModalOpen, setIsAddNeProductModalOpen] =
    useState(false);
  const [status, setStatus] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const offset = (currentPage - 1) * dataPerPage;
  const visibleFoodItem = itemList.slice(offset, offset + dataPerPage);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/food-items", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setItemList(await res.json());
      }
    } catch (error) {
      console.log("Admin Fetching all items error", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [
    isUpdateStatusModalOpen,
    isDeleteModalOpen,
    isViewItemModalOpen,
    isAddNewProductModalOpen,
  ]);

  const handleCurrentPage = (index) => {
    setCurrentPage(index);
  };

  const handleClickView = (index) => {
    setSelectedItemIndex(index);
    setIsViewItemModalOpen(true);
  };

  const handleViewModalClose = () => {
    setIsViewItemModalOpen(false);
  };

  const handleDeleteClick = (id) => {
    setSelectedItemId(id);
    setIsDeleteModalOPen(true);
  };

  const handleModalClose = () => {
    setIsDeleteModalOPen(false);
    setIsUpdateStatusModalOpen(false);
  };

  const handleUpdateModalOpenClick = (id, status) => {
    setSelectedItemId(id);
    setStatus(status);
    setIsUpdateStatusModalOpen(true);
  };

  const handleNewProductModalOpen = () => {
    setIsAddNeProductModalOpen(true);
  };
  const handleNewProductModalClose = () => {
    setIsAddNeProductModalOpen(false);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-10 relative">
        <button
          onClick={handleNewProductModalOpen}
          className="absolute right-3 top-0 bg-green-700 text-white p-2 rounded-md hover:bg-green-600"
        >
          Add New
        </button>
        <ItemsInDetailsTable>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Item Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Date</th>
              <th>Action & Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleFoodItem.map((item, index) => {
              const { id, title, image, price, createdAt, status, desc } = item;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Image
                      width={70}
                      height={70}
                      alt={"title"}
                      src={`${image}`}
                      sizes={"(max-width:768px) 50vh, 100vh"}
                    />
                  </td>
                  <td>{title}</td>
                  <td>{desc}</td>
                  <td>{price}Tk</td>
                  <td>{dateFormatter(createdAt)}</td>
                  <td>
                    <div className="flex flex-row  gap-2">
                      <span
                        onClick={() => handleClickView(index)}
                        className={"view"}
                      >
                        Edit
                      </span>
                      {status === "available" && (
                        <span
                          onClick={() =>
                            handleUpdateModalOpenClick(id, "unavailable")
                          }
                          className="available"
                        >
                          Make Unavailable
                        </span>
                      )}
                      {status !== "available" && (
                        <span
                          onClick={() =>
                            handleUpdateModalOpenClick(id, "available")
                          }
                          className="unavailable"
                        >
                          Make Available
                        </span>
                      )}
                      <span
                        onClick={() => handleDeleteClick(id)}
                        className={"delete"}
                      >
                        Delete
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </ItemsInDetailsTable>
        <PaginationComponent
          visibleItemCount={visibleFoodItem.length}
          length={itemList.length}
          dataPerPage={dataPerPage}
          getCurrentPage={handleCurrentPage}
        />
      </div>
      {isDeleteModalOpen && (
        <DeleteItemModal
          itemId={selectedItemId}
          handleModalClose={handleModalClose}
        />
      )}

      {isUpdateStatusModalOpen && (
        <UpdateItemStatusModal
          status={status}
          itemId={selectedItemId}
          handleModalClose={handleModalClose}
        />
      )}
      {isViewItemModalOpen && (
        <ViewItemDetailsModal
          handleItemViewModalClose={handleViewModalClose}
          itemInfo={visibleFoodItem[selectedItemIndex]}
        />
      )}
      {isAddNewProductModalOpen && (
        <AddNewProductModal handleModalClose={handleNewProductModalClose} />
      )}
    </>
  );
};

export default AvailableItemsSection;
