import { UsersStyledTable } from "@/styled/admin.pageStyles";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PaginationComponent } from "../shared";
import { DeleteUserModal } from ".";
import { cookies } from "@/config/cookies";

const UsersListSection = () => {
  const token = cookies.get("user_token");
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;
  const offset = (currentPage - 1) * dataPerPage;
  const visibleUser = userList.slice(offset, offset + dataPerPage);
  const [isActionModalOpen, setIsActionModalOPen] = useState(false);
  const [userId, setUserId] = useState("");

  const getUserList = async () => {
    try {
      const res = await fetch(`/api/admin/user-list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setUserList(await res.json());
      }
    } catch (error) {
      console.error("Error fetching user list", error);
    }
  };

  useEffect(() => {}, []);

  useEffect(() => {
    getUserList();
  }, [isActionModalOpen]);

  const handleCurrentPage = (index) => {
    setCurrentPage(index);
  };

  const handleUserDeleteClick = (id) => {
    setUserId(id);
    setIsActionModalOPen(true);
  };

  const handleModalClose = () => {
    setIsActionModalOPen(false);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-10 bg-white p-3 rounded-md">
        <UsersStyledTable>
          <thead>
            <tr>
              <th>#</th>
              <th>User ID</th>
              <th>Profile</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleUser.map((item, index) => {
              const { id, name, verified, email, image } = item;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{id}</td>
                  <td>
                    <Image
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="User Profile"
                      src={image ? image : "/default.jpg"}
                    />
                  </td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>
                    <button onClick={() => handleUserDeleteClick(id)}>
                      Delete User
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </UsersStyledTable>
        <PaginationComponent
          visibleItemCount={visibleUser.length}
          length={userList.length}
          dataPerPage={dataPerPage}
          getCurrentPage={handleCurrentPage}
        />
      </div>
      {isActionModalOpen && (
        <DeleteUserModal handleModalClose={handleModalClose} userId={userId} />
      )}
    </>
  );
};

export default UsersListSection;
