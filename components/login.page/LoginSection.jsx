import {
  StyledInputField,
  StyledLabel,
  StyledLoginBtn,
  StyledLoginContainer,
} from "@/styled/login.PageStyles";
import React from "react";
import Link from "next/link";
import { useFormik } from "formik";
import { object, string, email } from "yup";

const LoginSection = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: object({
      email: string().required().email().trim(),
      password: string().required(),
    }),
    onSubmit: (values) => {
      loginCall(values);
    },
  });

  return (
    <>
      <StyledLoginContainer>
        <div className=" flex flex-col bg-white rounded-lg p-10 m-auto gap-5 shadow-xl">
          <div className="flex flex-col gap-3 m-3">
            <p className="text-center text-xl">Welcome Back !</p>
            <p className="text-center text-base text-gray-600">
              Login to order your meal
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <StyledLabel>Email</StyledLabel>
            <StyledInputField
              placeholder="example@iubat.edu"
              name="email"
              onChange={formik.handleChange}
              type="email"
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
            <StyledLabel>Password</StyledLabel>
            <StyledInputField
              name="password"
              onChange={formik.handleChange}
              placeholder="**********"
              type="password"
              $error={
                formik.errors.password != undefined &&
                formik.touched.password == true
              }
            />
            {formik.errors.password != undefined &&
              formik.touched.password == true && (
                <div className="text-red-600">
                  {formik.errors.password || ""}
                </div>
              )}
          </div>
          <div className="flex flex-row gap-3 justify-between">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name="rememberMe"
                onChange={formik.handleChange}
              />
              <label>Remember Me</label>
            </div>
          </div>
          <StyledLoginBtn type="button" onClick={() => formik.handleSubmit()}>
            Sign In
          </StyledLoginBtn>
          <p className="mb-10">
            New User?
            <Link href={"/registration"}>
              <span className="underline cursor-pointer font-bold">
                Register Here
              </span>
            </Link>
          </p>
        </div>
      </StyledLoginContainer>
    </>
  );
};

export default LoginSection;
