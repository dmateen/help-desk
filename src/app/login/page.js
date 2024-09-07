"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {useEffect, useState} from "react";
import { ThemeSwitcher } from "@/components/custom/landing-page/theme-switcher";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "@/app/login/zodSchema";
import {NetworkService} from "@/network";
import {useRouter} from "next/navigation";
import {useAuth} from "@/contextProvider/authContextProvider";

function Page() {
  const [isPatient, setIsPatient] = useState(true);
  const router = useRouter()
  const { setAuthTokens } = useAuth();

  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    form.clearErrors()
  },[isPatient])

  const onSubmit = async(data) => {
    try{
      const response = await NetworkService.post('/user/login/', data);
      if(response?.status===200){
        const { access_token, refresh_token } = response?.data;
        setAuthTokens(access_token, refresh_token);
      }
    }catch(e){
      console.log(e)
    }
  };

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:h-lvh">
          <div>
            <div className="p-12">
              <ThemeSwitcher />
            </div>
            <div className="flex items-center justify-center py-12">
              <div className="mx-auto grid w-[350px] gap-6">
                <div className="grid gap-2 text-center">
                  <h1 className="text-3xl font-bold">Login</h1>
                  <p className="text-balance text-muted-foreground">
                    Enter your email below to login to your account
                  </p>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>UserName*</FormLabel>
                              <FormControl>
                                <Input {...field}  placeholder="Enter User Name Here" />
                              </FormControl>
                              <FormMessage>{form.formState.errors.username?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                  </div>

                  <div className="grid gap-2">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel> <Label htmlFor="password">Password*</Label>
                                </FormLabel>
                              <FormControl>
                                <Input {...field} type="password" />
                              </FormControl>
                              <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <Button onClick={() => setIsPatient((prev) => !prev)} variant="outline" className="w-full">
                    {isPatient ? "Login as Doctor" : "Login as Patient"}
                  </Button>
                  {/*<Link href="/forgot-password" className=" text-center inline-block text-sm underline">*/}
                  {/*  Forgot your password?*/}
                  {/*</Link>*/}
                </div>

                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/SignUp" className="underline">
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden bg-muted lg:block">
            {/*<div className="flex items-center justify-center py-12">*/}
            {/*  <h1 className="text-3xl font-bold">PMS, A one stop solution for HealthCare</h1>*/}
            {/*</div>*/}
            {/*<Image*/}
            {/*    src="/placeholder.svg"*/}
            {/*    alt="Image"*/}
            {/*    width="1920"*/}
            {/*    height="1080"*/}
            {/*    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"*/}
            {/*/>*/}
          </div>
        </form>
      </Form>
  );
}

export default Page;
