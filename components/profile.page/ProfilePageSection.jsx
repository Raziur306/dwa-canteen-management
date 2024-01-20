import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import EditPen from "@/public/EditPen";
import { useFormik } from "formik";
import { number, object, string } from "yup";
import {
  AccountEditPenWrapper,
  StyledProfileUpdateBtn,
  StyledSettingInputLabel,
  StyledSettingsBioTextArea,
  StyledSettingsTextField,
} from "@/styled/profile.pageStyles";
import { cookies } from "@/config/cookies";
import toast from "react-hot-toast";

const ProfilePageSection = () => {
  const [isDisable, setIsDisable] = useState(true);
  const imgPickerRef = useRef(null);
  const token = cookies.get("user_token");

  const handleEditPenClick = () => {
    setIsDisable(!isDisable);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      image: "",
    },
    validationSchema: object({
      name: string().required(),
      email: string().email().required(),
      phone: number().required().min(100),
      address: string().required(),
      image: string(),
    }),
    onSubmit: (value) => {
      updateProfile(value);
    },
  });

  // useEffect(() => {
  //   formik.setValues(profileInfo.result);
  // }, [profileInfo]);

  const updateProfile = async (value) => {
    try {
      if (!formik.values.image) {
        formik.setValues({
          ...formik.values,
          image: "",
        });
      }

      console.log("Called");
      const updateCall = () =>
        fetch("/api/update-profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(value),
        });
      await toast.promise(updateCall(), {
        loading: <b>Updating profile...</b>,
        success: (res) => {
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          setIsDisable(true);
          return <b>Profile update successful</b>;
        },
        error: (err) => <b>{err.toString()}</b>,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
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

  const handleUploadClick = () => {
    imgPickerRef.current.click();
  };

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await fetch("/api/user-info", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          formik.setValues({
            ...data,
          });
        }
      } catch (error) {
        console.log("Fetching profile info error", error);
      }
    };
    getProfileData();
  }, [token]);

  return (
    <div className="mt-10 mb-10 w-2/4 m-auto shadow-xl p-10">
      <div className="flex flex-row gap-40">
        <div
          className="flex flex-col items-center cursor-pointer gap-5 m-auto"
          onClick={handleUploadClick}
        >
          <input
            style={{ display: "none" }}
            ref={imgPickerRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <div className="relative w-28 aspect-[1/1]">
            <Image
              fill
              alt="Profile"
              src={`${formik.values?.image || "/default.jpg"}`}
              className="rounded-full border-2"
              sizes={"(max-width: 768px) 100vh, 96px"}
            />
          </div>
          <p className="text-sm underline text-[#909090]">Upload a new photo</p>
        </div>
      </div>
      <div className="flex justify-end p-3">
        <AccountEditPenWrapper onClick={handleEditPenClick}>
          <EditPen />
        </AccountEditPenWrapper>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2 w-full">
          <StyledSettingInputLabel htmlFor="Full Name">
            Full Name
          </StyledSettingInputLabel>
          <StyledSettingsTextField
            disabled={isDisable}
            placeholder="Full name"
            type="text"
            value={formik.values?.name}
            name="name"
            onChange={formik.handleChange}
            $error={
              formik.errors.name != undefined && formik.touched.name == true
            }
          />
          {formik.errors.name != undefined && formik.touched.name == true && (
            <span className="text-red-600">{formik.errors.name || ""}</span>
          )}

          <div className="flex flex-col gap-2 w-full">
            <StyledSettingInputLabel htmlFor="University Email ID">
              Your Email ID
            </StyledSettingInputLabel>
            <StyledSettingsTextField
              disabled={isDisable}
              value={formik.values?.email}
              placeholder="example@email.com"
              type="email"
              name="email"
              onChange={formik.handleChange}
              $error={
                formik.errors.email != undefined && formik.touched.email == true
              }
            />
            {formik.errors.email != undefined &&
              formik.touched.email == true && (
                <span className="text-red-600">
                  {formik.errors.email || ""}
                </span>
              )}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <StyledSettingInputLabel htmlFor="Phone Number">
            Phone Number
          </StyledSettingInputLabel>
          <StyledSettingsTextField
            disabled={isDisable}
            placeholder="Enter your phone number"
            type="number"
            value={formik.values?.phone}
            name="phone"
            onChange={formik.handleChange}
            onWheel={(e) => e.target.blur()}
            min={1}
            $error={
              formik.errors.phone != undefined && formik.touched.phone == true
            }
          />
          {formik.errors.phone != undefined && formik.touched.phone == true && (
            <span className="text-red-600">{formik.errors.phone || ""}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <StyledSettingInputLabel htmlFor="Bio">
            Address
          </StyledSettingInputLabel>
          <StyledSettingsBioTextArea
            disabled={isDisable}
            placeholder="Write your full address"
            value={formik.values?.address}
            name="address"
            onChange={formik.handleChange}
            $error={
              formik.errors.address != undefined &&
              formik.touched.address == true
            }
          />
          {formik.errors.address != undefined &&
            formik.touched.address == true && (
              <span className="text-red-600">
                {formik.errors.address || ""}
              </span>
            )}
        </div>

        <StyledProfileUpdateBtn
          type="button"
          onClick={() => formik.handleSubmit()}
          disabled={isDisable}
        >
          Update Profile
        </StyledProfileUpdateBtn>
      </div>
    </div>
  );
};

export default ProfilePageSection;
