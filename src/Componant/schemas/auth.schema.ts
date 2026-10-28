import * as zod from "zod";

export const registSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("name is required")
      .min(3, "min length 3 chare")
      .max(10, "max length 10 chare"),
    email: zod
      .email()
      .nonempty("email is required")
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "inavlid email"),
    dateOfBirth: zod
      .string()
      .nonempty("dateOfBirth is required")
      .refine(dateOfBirthvalue => {
        const userdata = new Date(dateOfBirthvalue).getFullYear();
        const NowDate = new Date().getFullYear();
        return NowDate - userdata > 10 ? true : false;
      }, "Date should be less than ==> 2015"),
    gender: zod.enum(["female", "male"]),
    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "password must contain at least 8 chara and 0ne special chara and number and uppercase and lowercase chara ",
      ),
    rePassword: zod
      .string()
      .nonempty("rePassword is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "password must contain at least 8 chara and 0ne special chara and number and uppercase and lowercase chara ",
      ),
  })
  .refine(
    obj => {
      if (obj.password === obj.rePassword) {
        return true;
      } else {
        return false;
      }
    },
    {
      path: ["rePassword"],
      error: "password and rePassword is not match",
    },
  );

/////////////////////////////////

export const LoginSchema = zod
  .object({
    email: zod
      .email()
      .nonempty("email is required")
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "inavlid email"),

    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "password must contain at least 8 chara and 0ne special chara and number and uppercase and lowercase chara ",
      ),
  })

  