import React, { useContext, useEffect, useState } from "react";
import { PaginationComponent } from "../shared";
import { ItemsInDetailsTable } from "@/styled/admin.pageStyles";
import { dateFormatter } from "@/utils";
import { cookies } from "@/config/cookies";
import { UpdateOrderStatusModal, ViewOrderDetailsModal } from ".";

const PendingOrdersSection = () => {
  const token = cookies.get("user_token");
  const [orderList, setOrderList] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
  const [isViewItemModalOpen, setIsViewItemModalOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  const offset = (currentPage - 1) * dataPerPage;
  const visibleOrders = orderList.slice(offset, offset + dataPerPage);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/pending-orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setOrderList(await res.json());
      }
    } catch (error) {
      console.log("Admin Fetching all order", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [isUpdateStatusModalOpen]);

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

  const handleModalClose = () => {
    setIsUpdateStatusModalOpen(false);
  };

  const handleUpdateModalOpenClick = (id, status) => {
    setSelectedItemId(id);
    setStatus(status);
    setIsUpdateStatusModalOpen(true);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-10">
        <ItemsInDetailsTable>
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Orderer Name</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
              <th className="!text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleOrders.map((item, index) => {
              const { id, subTotal, createdAt, status, User } = item;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{id}</td>
                  <td>{User.name}</td>
                  <td>{subTotal}Tk</td>
                  <td>{dateFormatter(createdAt)}</td>
                  <td className={`${status}-style`}>{status}</td>
                  <td>
                    <div className="flex flex-row  gap-2">
                      <span
                        onClick={() => handleClickView(index)}
                        className={"view"}
                      >
                        View
                      </span>

                      {status == "pending" && (
                        <span
                          className="processing"
                          onClick={() =>
                            handleUpdateModalOpenClick(id, "processing")
                          }
                        >
                          Processing
                        </span>
                      )}
                      {status == "processing" && (
                        <span
                          className="delivered"
                          onClick={() =>
                            handleUpdateModalOpenClick(id, "delivered")
                          }
                        >
                          Delivered
                        </span>
                      )}
                      {(status == "pending" || status == "processing") && (
                        <span
                          className="cancelled"
                          onClick={() =>
                            handleUpdateModalOpenClick(id, "cancelled")
                          }
                        >
                          Cancel
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </ItemsInDetailsTable>
        <PaginationComponent
          visibleItemCount={visibleOrders.length}
          length={orderList.length}
          dataPerPage={dataPerPage}
          getCurrentPage={handleCurrentPage}
        />
      </div>

      {isUpdateStatusModalOpen && (
        <UpdateOrderStatusModal
          status={status}
          itemId={selectedItemId}
          handleModalClose={handleModalClose}
        />
      )}
      {isViewItemModalOpen && (
        <ViewOrderDetailsModal
          handleModalClose={handleViewModalClose}
          orderInfo={visibleOrders[selectedItemIndex]}
        />
      )}
    </>
  );
};

export default PendingOrdersSection;
