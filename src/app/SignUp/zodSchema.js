import { z } from "zod"


export const signUpFormSchema = z.object({
  first_name: z.string({
    required_error: 'First name is required',
  }).min(1, "First name is required"),
  last_name: z.string({
    required_error: 'Last name is required',
  }).min(2, "Last name is required"),
  username: z.string({
    required_error: 'User name is required',
  }).min(1, "User Name is required"),
  password: z.string({
    required_error: 'Password is required',
  }).min(8, "Password should be greater than 8 characters"),
  phone: z.coerce.number({
    required_error: 'Phone Number is required',
    invalid_type_error: 'Enter numbers only',
  }).min(999999999, "Invalid Phone Number").max(99999999999999999999, "Phone number should be less than 20"),
  email: z.string({
    required_error: 'Email is required',
  }).email("Invalid email address"),
  gender: z.string({
    required_error: 'Gender is required',
  }).min(1, 'Gender is required'),
  age: z.coerce.number({
    required_error: 'Age is required',
    invalid_type_error: 'Enter numbers only',
  }).min(1, "Age is required").max(150,'Invalid Age'),
  birthday: z.coerce.date({
    required_error: "Date is Required",
    invalid_type_error: "Invalid Date",
  }),
});