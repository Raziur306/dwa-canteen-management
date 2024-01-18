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
import toast from "react-hot-toast";
import { cookies } from "../../config/cookies";
import { useRouter } from "next/router";

const LoginSection = () => {
  const router = useRouter();
  const setToken = async (res) => {
    const data = await res.json();
    cookies.set("user_token", data.token);
    router.push("/");
  };

  const login = async (values) => {
    try {
      const loginCall = () =>
        fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

      await toast.promise(loginCall(), {
        loading: <b>Logging in..</b>,
        success: (res) => {
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          setToken(res);
          return <b>Login successful!</b>;
        },
        error: (err) => <b>{err.toString()}</b>,
      });
    } catch (error) {
      console.log("Login error", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: object({
      email: string().required().email().trim(),
      password: string().required(),
    }),
    onSubmit: (values) => {
      login(values);
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
