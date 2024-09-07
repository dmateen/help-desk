"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "@/components/custom/landing-page/theme-switcher";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {signUpFormSchema} from "@/app/SignUp/zodSchema";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {NetworkService} from "@/network";
import {setDateFormat} from "@/Utils/common";
import {useRouter} from "next/navigation";
import {useAuth} from "@/contextProvider/authContextProvider";

function SignupPage() {
const router = useRouter()
  const [isPatient, setIsPatient] = useState(true);
  const { accessToken, logout } = useAuth();
  console.log({accessToken})
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    mode: "onSubmit",
    defaultValues: {
      first_name: undefined,
      last_name: undefined,
      username: undefined,
      phone: undefined,
      email: undefined,
      gender: undefined,
      age: undefined,
      birthday: undefined,
      password: undefined,
    },
  });

  const onSubmit = async(data) => {
    const signUpData = {
      ...data,
      birthday:setDateFormat(data?.birthday),
      role: isPatient ? 3 :2,
    }
    console.log(data)
    try{
      const response = await NetworkService.post('user/register/', signUpData);
      response?.status===201 && router.push("/login");

    }catch(e){
      console.log(e)
    }
  };

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}  >
          <div>
            <div className="p-12">
              <ThemeSwitcher />
            </div>
            <div className="flex items-center justify-center">
              <Card className="w-1/4 mb-40">
                <CardHeader>
                  <CardTitle className="text-xl">Sign Up</CardTitle>
                  <CardDescription>Enter your information to create an account</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                      control={form.control}
                      name="first_name"
                      render={({field}) => (
                          <FormItem className={'mb-5'} >
                            <FormLabel>First Name*</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" placeholder="First Name"/>
                            </FormControl>
                            <FormMessage>{form.formState.errors.first_name?.message}</FormMessage>
                          </FormItem>
                      )}
                  />

                  {/* Last Name */}
                  <FormField
                      control={form.control}
                      name="last_name"
                      render={({field}) => (
                          <FormItem className={'mb-5'} >
                            <FormLabel>Last Name*</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" placeholder="Last Name"/>
                            </FormControl>
                            <FormMessage>{form.formState.errors.last_name?.message}</FormMessage>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="username"
                      render={({field}) => (
                          <FormItem className={'mb-5'} >
                            <FormLabel>UserName*</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" placeholder="Enter User Name here"/>
                            </FormControl>
                            <FormMessage>{form.formState.errors.username?.message}</FormMessage>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="password"
                      render={({field}) => (
                          <FormItem className={'mb-5'} >
                            <FormLabel>Password*</FormLabel>
                            <FormControl>
                              <Input {...field} type="password" placeholder="Enter PassWord here"/>
                            </FormControl>
                            <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                          </FormItem>
                      )}
                  />

                  {/* Phone Number */}
                  <FormField
                      control={form.control}
                      name="phone"
                      render={({field}) => (
                          <FormItem className={'mb-5'} >
                            <FormLabel>Phone Number*</FormLabel>
                            <FormControl>
                              <Input {...field} type="text" placeholder="1234567890"/>
                            </FormControl>
                            <FormMessage>{form.formState.errors.phone?.message}</FormMessage>
                          </FormItem>
                      )}
                  />
                  {/* Email */}
                  <FormField
                      control={form.control}
                      name="email"
                      render={({field}) => (
                          <FormItem className={'mb-5'} >
                            <FormLabel>Email*</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" placeholder="m@example.com"/>
                            </FormControl>
                            <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                          </FormItem>
                      )}
                  />

                  {/* Gender */}
                  <FormField
                      control={form.control}
                      name="gender"
                      render={({field}) => (
                          <FormItem className={'mb-5 flex flex-col'} >
                            <FormLabel>Gender*</FormLabel>
                            <FormControl>
                              <select {...field} className="border border-gray-300 rounded-md p-2">
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </FormControl>
                            <FormMessage>{form.formState.errors.gender?.message}</FormMessage>
                          </FormItem>
                      )}
                  />

                  {/* Age */}
                  <FormField
                      control={form.control}
                      name="age"
                      render={({field}) => (
                          <FormItem className={'mb-5'}  >
                            <FormLabel>Age*</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" placeholder="25"/>
                            </FormControl>
                            <FormMessage>{form.formState.errors.age?.message}</FormMessage>
                          </FormItem>
                      )}
                  />

                  <FormField
                      control={form.control}
                      name="birthday"
                      render={({field}) => (
                          <FormItem className={'mb-5'} >
                            <FormLabel>Date of Birth*</FormLabel>
                            <FormControl>
                              <Input {...field} type="date" placeholder="YYYY-MM-DD"/>
                            </FormControl>
                            <FormMessage>{form.formState.errors.birthday?.message}</FormMessage>
                          </FormItem>
                      )}
                  />

                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                  <Button onClick={()=>setIsPatient((prev)=>!prev)} className="w-full mt-5">
                    {isPatient ? "Sign Up as Doctor" : "Sign Up as patient" }
                  </Button>
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline">
                      Log in
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>


          </div>
        </form>
      </Form>
  );
}

export default SignupPage;
