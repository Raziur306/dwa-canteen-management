import { cookies } from "@/config/cookies";
import {
  StyledInputLabel,
  StyledTextField,
  ViewDetailsDialogTitleText,
} from "@/styled/sharedStyles";
import { useFormik } from "formik";
import Image from "next/image";
import React, { useRef } from "react";
import { object, string, number } from "yup";
import { toast } from "react-hot-toast";

const AddNewProductModal = ({ handleModalClose }) => {
  const imageFileRef = useRef(null);
  const token = cookies.get("user_token");

  const addNewItemCall = async (values) => {
    try {
      const addNewItem = () =>
        fetch(`/api/admin/add-item`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

      await toast.promise(addNewItem(), {
        loading: <b>Adding new item...</b>,
        success: (res) => {
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          handleModalClose();
          return <b>Added successfully!</b>;
        },
        error: (err) => <b>{err.toString()}</b>,
      });
    } catch (error) {
      console.log("Add new product error", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      image: "",
      price: "",
    },
    validationSchema: object({
      title: string().required(),
      desc: string().required(),
      image: string().required(),
      price: number().required().min(0),
    }),
    onSubmit: (values) => {
      addNewItemCall(values);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result;
        formik.setValues({
          ...formik.values,
          image: imageUrl,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    imageFileRef.current.click();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="relative p-4 w-full max-w-4xl max-h-full ">
        <div className="relative bg-white rounded-lg shadow ">
          <button
            onClick={() => handleModalClose()}
            type="button"
            className="absolute top-3 end-2.5 text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-gray-600 w-12 h-12 "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>

            <ViewDetailsDialogTitleText>
              Add new item
            </ViewDetailsDialogTitleText>
            <div className="flex flex-row gap-7 bg-white rounded-lg w-full text-start  p-10">
              <div className=" flex flex-col gap-7 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <StyledInputLabel htmlFor="Book Name">
                    Product Title
                  </StyledInputLabel>
                  <StyledTextField
                    placeholder="Item Title"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <StyledInputLabel htmlFor="Author Name">
                    Short Description
                  </StyledInputLabel>
                  <StyledTextField
                    placeholder="Short Description"
                    name="desc"
                    value={formik.values.desc}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-7 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <StyledInputLabel htmlFor="Book Amount">
                    Price
                  </StyledInputLabel>
                  <StyledTextField
                    placeholder="Enter amount"
                    type="number"
                    name="price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    onWheel={(e) => e.target?.blur()}
                  />
                </div>
                <div className="flex flex-col gap-3 w-full items-center">
                  <StyledInputLabel htmlFor="Cover Page">
                    Image
                  </StyledInputLabel>
                  <Image
                    onClick={handleImageClick}
                    className="cursor-pointer"
                    priority
                    alt="Item Preview"
                    width={150}
                    height={150}
                    src={`${formik.values.image || "/pickImage.png"}`}
                  />
                  <span className="text-sm">Choose new image</span>
                  <input
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    ref={imageFileRef}
                    type="file"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              onClick={formik.handleSubmit}
              className="bg-green-700 text-white m-auto p-3 rounded-md hover:bg-green-600"
            >
              Add New Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProductModal;
