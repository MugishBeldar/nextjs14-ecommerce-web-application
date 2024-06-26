"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MdAlternateEmail, MdOutlineLockOpen } from "react-icons/md";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { CiLock } from "react-icons/ci";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { toast } from "sonner";

interface CredentialsFormProps {
  csrfToken?: string;
}

export function CredentialsForm(props: CredentialsFormProps) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    const signInResponse = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if(signInResponse && !signInResponse.error) {
      // toast.success("Login successfully.");
      form.reset();
      router.push("/admin/dashboard");
      return;
    } else {
      if(signInResponse?.error === "CredentialsSignin")
      toast.error("Wrong email and password");
    }
  };

  return (
    // <div>
    //   <form
    //     className="w-full h-full text-xl font-semibold flex flex-col"
    //     onSubmit={handleSubmit}
    //   >
    //     {error && (
    //       <span className="p-4 py-2 mb-4 text-center text-lg font-semibold text-white bg-destructive/20 rounded-md">
    //         {error}
    //       </span>
    //     )}
    //     <div className="relative">
    //       <MdAlternateEmail className="absolute text-zinc-400 mt-[10px] mx-2" />

    //       <Input
    //         type="email"
    //         name="email"
    //         placeholder="Email"
    //         required
    //         className="w-full px-8 py-2 mb-4 text-primary-txt rounded-md border border-zin-400/20 bg-transparent focus:border-custom-font placeholder:text-zinc-400 placeholder:font-medium placeholder:text-lg"
    //       />
    //     </div>

    //     <div className="relative">
    //       <MdOutlineLockOpen className="absolute text-zinc-400 mt-[10px] mx-2 " />
    //       <Input
    //         type="password"
    //         name="password"
    //         placeholder="Password"
    //         required
    //         className="w-full px-8 py-2 mb-4 text-primary-txt rounded-md border border-zinc-400/20 bg-transparent focus:border-custom-font placeholder:text-zinc-400 placeholder:font-medium placeholder:text-lg"
    //       />
    //     </div>

    //     <Button
    //       type="submit"
    //       className="w-full h-10  px-6 text-lg text-white transition-colors duration-150 bg-secondary-blue  rounded-md focus:shadow-outline hover:bg-secondary-blue"
    //     >
    //       Sign in
    //     </Button>
    //   </form>
    // </div>
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
          <div className="mb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-primary-txt text-xl ">
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="w-full  py-2 mb-4 text-primary-txt rounded-md border border-zinc-400/20 bg-transparent focus:border-custom-font  placeholder:font-medium "
                      placeholder="Enter email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-primary-txt text-xl ">
                    Password <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="password"
                      className="w-full  py-2 mb-4 text-primary-txt rounded-md border border-zinc-400/20 bg-transparent focus:border-custom-font  placeholder:font-medium "
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full h-10 mt-6 px-6 text-lg text-white transition-colors duration-150 bg-secondary-blue  rounded-md focus:shadow-outline hover:bg-secondary-blue"
          >
            Sign in
          </Button>
        </form>
      </Form>
    </div>
  );
}
