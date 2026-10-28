// import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "../../Componant/schemas/auth.schema";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

interface userdata {
  email: string;
  password: string;
}

export default function Login() {
  const [apiError, setapiError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const Navigate = useNavigate();
  const {  setuserLogin } = useContext(AuthContext);
  const form = useForm<userdata>({
    defaultValues: {
      email: "",

      password: "",
    },
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });
  let { register, handleSubmit, formState } = form;

  function handleLogin(values: userdata) {
    console.log(values);
    setisLoading(true);

    axios
      .post("https://route-posts.routemisr.com/users/signin", values)
      .then(res => {
        // console.log(res.data.success);
        if (res.data.success) {  localStorage.setItem("user-token", res.data.data.token)
          console.log(res.data.data.token);
        ;
          setuserLogin(res.data.data.token);
          Navigate("/");
        }
      })

      .catch(err => {
        console.log(err.response.data.message);
        setapiError(err.response.data.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  return (
    <>
      <h1 className="text-center text-3xl font-bold my-5">Login Now</h1>
      {apiError && (
        <p className="bg-red-500 mb-4 p-2 text-center rounded-3xl text-white w-75 mx-auto">
          {apiError}
        </p>
      )}
      <form onSubmit={handleSubmit(handleLogin)} className="max-w-md mx-auto">
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

        <button
          disabled={isLoading}
          type="submit"
          className=" disabled :bg-slate-900 disabled:text-white  disabled:cursor-not-allowed                        text-white rounded-3xl bg-blue-500 w-full box-border border border-transparent hover:bg-blue-600  focus:bg-blue-900 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          {isLoading ? "loading..." : "login"}
        </button>
        <div className="flex justify-center text-slate-700 font-bold cursor-pointer my-2 underline">
          <Link to={"/Register"}>Don't You Have An Account Go Register</Link>
        </div>
      </form>
    </>
  );
}
