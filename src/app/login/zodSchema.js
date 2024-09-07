import { z } from "zod"

export const LoginFormSchema = z.object({
  username: z.string({
    required_error: "user name is required",
  }).min(1,'User Name is Required'),
  password: z.string({
    required_error: "Password is required",
  }).min(1,'Password is Required')
})