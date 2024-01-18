import React from "react";
import {
  StyledRegistrationInputField,
  StyledRegistrationLabel,
  StyledSignUpBtn,
  StyledRegistrationContainer,
} from "@/styled/registration.pageStyles";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useFormik } from "formik";
import { object, string, ref } from "yup";

const RegistrationSection = () => {
  const router = useRouter();

  const handleSignInBtnClick = () => {
    router.push("/login");
  };

  const registerUser = async (values) => {
    try {
      const registerCall = () =>
        fetch("/api/registration", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
      await toast.promise(registerCall(), {
        loading: <b>Registering...</b>,
        success: (res) => {
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          router.push("/login");
          return <b>Registration successful</b>;
        },
        error: (err) => <b>{err.toString()}</b>,
      });
    } catch (error) {
      console.log("Registration error", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: object({
      name: string()
        .required()
        .min(3)
        .trim()
        .matches(/^[a-zA-Z\s]+$/, "Name must not contain special characters"),
      email: string().email().trim().required(),
      password: string().required().min(4),
      confirmPassword: string()
        .required()
        .oneOf([ref("password")], "Passwords must match"),
    }),
    onSubmit: (values) => {
      registerUser(values);
    },
  });

  return (
    <>
      <StyledRegistrationContainer>
        <div className=" flex flex-col bg-white rounded-lg p-10 m-auto gap-5 shadow-xl">
          <div className="flex flex-col gap-3 m-3">
            <p className="text-center text-xl">Create Your Account</p>
            <p className="text-center text-base text-gray-600">
              Welcome to DWA Canteen!
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <StyledRegistrationLabel>Full Name</StyledRegistrationLabel>
            <StyledRegistrationInputField
              placeholder="Enter your full name"
              type="text"
              name="name"
              onChange={formik.handleChange}
              $error={
                formik.errors.name != undefined && formik.touched.name == true
              }
            />
            {formik.errors.name != undefined && formik.touched.name == true && (
              <div className="text-red-600">{formik.errors.name || ""}</div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <StyledRegistrationLabel>Email</StyledRegistrationLabel>
            <StyledRegistrationInputField
              placeholder="example@email.com"
              type="email"
              onChange={formik.handleChange}
              name="email"
              $error={
                formik.errors.email != undefined && formik.touched.email == true
              }
            />
            {formik.errors.email != undefined &&
              formik.touched.email == true && (
                <div className="text-red-600">{formik.errors.email || ""}</div>
              )}
          </div>
          <div className="flex flex-col gap-3">
            <StyledRegistrationLabel>Password</StyledRegistrationLabel>
            <StyledRegistrationInputField
              placeholder="**********"
              type="password"
              name="password"
              onChange={formik.handleChange}
              $error={
                formik.errors.password != undefined &&
                formik.touched.password == true
              }
            />
          </div>
          {formik.errors.password != undefined &&
            formik.touched.password == true && (
              <div className="text-red-600">{formik.errors.password}</div>
            )}
          <div className="flex flex-col gap-3">
            <StyledRegistrationLabel>Confirm Password</StyledRegistrationLabel>
            <StyledRegistrationInputField
              placeholder="**********"
              type="password"
              name="confirmPassword"
              onChange={formik.handleChange}
              $error={
                formik.errors.confirmPassword != undefined &&
                formik.touched.confirmPassword == true
              }
            />
            {formik.errors.confirmPassword != undefined &&
              formik.touched.confirmPassword == true && (
                <div className="text-red-600">
                  {formik.errors.confirmPassword || ""}
                </div>
              )}
          </div>
          <StyledSignUpBtn type="button" onClick={() => formik.handleSubmit()}>
            Register
          </StyledSignUpBtn>
          <p className="mb-10">
            Already a user?
            <span
              onClick={handleSignInBtnClick}
              className="underline cursor-pointer font-bold"
            >
              Login Now
            </span>
          </p>
        </div>
      </StyledRegistrationContainer>
    </>
  );
};

export default RegistrationSection;
