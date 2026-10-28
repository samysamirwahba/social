// import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registSchema } from "../../Componant/schemas/auth.schema";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface userdata {
  name: string;
  email: string;
  dateOfBirth: string;
  gender: "male" | "female";
  password: string;
  rePassword: string;
}

export default function Register() {
  const [apiError, setapiError] = useState(null);
  const [isLoading, setisLoading] = useState(false)
  const Navigate = useNavigate();
  const form = useForm<userdata>({
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      gender: "female",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(registSchema),
    mode: "onChange",
  });
  let { register, handleSubmit, formState } = form;

  function handleRegister(values: userdata) {
    console.log(values);
    setisLoading(true)

    axios
      .post("https://route-posts.routemisr.com/users/signup", values)
      .then(res => {
        // console.log(res.data.success);
        if (res.data.success) {
          Navigate("/Login");
          
          
        }
      })

      .catch(err => {
        console.log(err.response.data.message);
        setapiError(err.response.data.message);
      })
      .finally(() => {
        setisLoading(false)
      })
  }

  return (
    <>
      <h1 className="text-center text-3xl font-bold my-5">Register Now</h1>
      {apiError && (
        <p className="bg-red-500 mb-4 p-2 text-center rounded-3xl text-white w-75 mx-auto">
          {apiError}
        </p>
      )}
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="max-w-md mx-auto"
      >
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register(
              "name",
              //   , {
              //   required: { value: true, message: " name is required" },
              //   minLength: { value: 3, message: "name length at least 3 chars" },
              //   maxLength: {
              //     value: 10,
              //     message: "name length not exceed 10 chars",
              //   },
              // }
            )}
            type="text"
            id="Name"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="Name"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:inset-s-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter your name
          </label>
          {formState.errors.name?.message && (
            <p className="text-red-400 font-bold">
              {formState.errors.name?.message}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register(
              "email",
              //   , {
              //   pattern: {
              //     value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              //     message: "email invalid",
              //   },
              // }
            )}
            type="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:inset-s-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter your email
          </label>
          {formState.errors.email?.message && (
            <p className="text-red-400 font-bold">
              {formState.errors.email?.message}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("dateOfBirth")}
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="dateOfBirth"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:inset-s-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter your birthData
          </label>
          {formState.errors.dateOfBirth?.message && (
            <p className="text-red-400 font-bold">
              {formState.errors.dateOfBirth?.message}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register(
              "password",
              //   , {
              //   pattern: {
              //     value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              //     message: "invalid password",
              //   },
              // }
            )}
            type="password"
            autoComplete="new-password"
            name="passWord"
            onBlur={e => {
              form.setValue("password", e.target.value, {
                shouldValidate: true,
              });
            }}
            id="passWord"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="passWord"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:inset-s-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter your password
          </label>
          {formState.errors.password?.message && (
            <p className="text-red-400 font-bold">
              {formState.errors.password?.message}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register(
              "rePassword",
              //   , {
              //   pattern: {
              //     value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
              //     message: "invalid password",
              //   },
              // }
            )}
            type="password"
            autoComplete="new-repassword"
            name="rePassWord"
            onBlur={e => {
              form.setValue("rePassword", e.target.value, {
                shouldValidate: true,
              });
            }}
            id="rePassWord"
            className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassWord"
            className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-left peer-focus:inset-s-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Enter your confirm passWord
          </label>
          {formState.errors.rePassword?.message && (
            <p className="text-red-400 font-bold">
              {formState.errors.rePassword?.message}
            </p>
          )}
        </div>
        <div className="flex gap-5 ">
          <div className="flex items-center mb-4">
            <input
              {...register(
                "gender",
                //   , {
                //   pattern: {
                //     value: /^(female|male)$/,
                //     message: "invalid gender",
                //   },
                // }
              )}
              id="disabled-radio-1"
              type="radio"
              defaultValue="male"
              name="gender"
              className="w-4 h-4 text-neutral-primary border-light-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
            />
            <label
              htmlFor="disabled-radio-1"
              className="select-none ms-2 text-sm font-medium "
            >
              male
            </label>
            {formState.errors.gender?.message && (
              <p className="text-red-400 font-bold">
                {formState.errors.gender?.message}
              </p>
            )}
          </div>
          <div className="flex ">
            <input
              {...register("gender")}
              id="disabled-radio-2"
              type="radio"
              defaultValue="female"
              name="gender"
              className="w-4 h-4 text-neutral-primary border-light bg-neutral-secondary-medium rounded-full checked:border-default-medium focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none"
            />
            <label
              htmlFor="disabled-radio-2"
              className="select-none ms-2 text-sm font-medium "
            >
              female
            </label>
            {formState.errors.gender?.message && (
              <p className="text-red-400 font-bold">
                {formState.errors.gender?.message}
              </p>
            )}
          </div>
        </div>
        <button
          disabled = {isLoading}
          type="submit"
          className=" disabled :bg-slate-900 disabled:text-white  disabled:cursor-not-allowed                        text-white rounded-3xl bg-blue-500 w-full box-border border border-transparent hover:bg-blue-600  focus:bg-blue-900 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          {isLoading ? "loading..." : "register"}
        </button>
        <div className="flex justify-center text-slate-700 font-bold cursor-pointer my-2 underline">
          <Link to = {"/Login"} >Do You Have An Account Go Login</Link>
        </div>
      </form>
    </>
  );
}
