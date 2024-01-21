import { ViewOrderDetailsModalWrapper } from "@/styled/admin.pageStyles";
import { dateFormatter } from "@/utils";
import React from "react";

const ViewOrderDetailsModal = ({ orderInfo, handleModalClose }) => {
  const handlePrintInvoiceClick = () => {
    window.print();
  };

  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="relative p-4 w-full max-w-md max-h-full print:!max-w-full print:!min-h-screen print:bg-white">
        <ViewOrderDetailsModalWrapper>
          <button
            onClick={() => handleModalClose()}
            type="button"
            className="print:invisible absolute top-3 end-2.5 text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <button
            onClick={handlePrintInvoiceClick}
            className=" print:invisible m-auto absolute right-0 left-0 top-2 p-2 bg-red-600 w-32 text-white rounded-md"
          >
            Print Invoice
          </button>

          <div className="flex flex-col p-7 gap-1 pt-16">
            <span>Order ID: {orderInfo.id}</span>
            <h2 className="text-center text-2xl font-bold">DWA Canteen</h2>
            <h3 className="text-center font-sm text-gray-600">Order Details</h3>
            <h3>Name: {orderInfo.User.name}</h3>
            <h3>Phone: {orderInfo.User.phone}</h3>
            <div>Order Data: {dateFormatter(orderInfo.createdAt)}</div>
            <h3>Address: {orderInfo.User.address}</h3>
            <table>
              <thead>
                <tr className="border">
                  <th className="p-3 border-r-2">#</th>
                  <th className=" border-r-2">Name</th>
                  <th className=" border-r-2">Quantity</th>
                  <th className=" border-r-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {orderInfo.items.map((item, index) => {
                  return (
                    <tr className="border" key={index}>
                      <td className=" border-r-2 text-center">{index + 1}</td>
                      <td className=" border-r-2">{item.title}</td>
                      <td className=" border-r-2 text-center">
                        {item.quantity}
                      </td>
                      <td className=" border-r-2 text-center">
                        {item.quantity} X {item.price} Tk
                      </td>
                    </tr>
                  );
                })}
                <tr className="border">
                  <td
                    colspan={3}
                    className="font-bold text-center p-2 border-r-2"
                  >
                    Sub Total / COD
                  </td>
                  <td className="font-bold text-center">
                    {orderInfo.subTotal}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ViewOrderDetailsModalWrapper>
      </div>
    </div>
  );
};

export default ViewOrderDetailsModal;
