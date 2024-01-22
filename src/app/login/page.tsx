"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { HiEye, HiEyeOff } from "react-icons/hi";
import React, { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "~/lib/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string(),
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string(),
});

function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "development",
      email: "dev1@gmail.com",
      password: "dev1234$",
    },
  });

  const [createUserWithEmailAndPassword, user, loading, createError] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  useEffect(() => {
    if (createError ?? updateError) {
      const errorToDisplay = createError ?? updateError;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${errorToDisplay?.message}`,
      });
    }
  }, [createError, toast, updateError]);
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    const { email, password, name } = values;
    const user = await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    console.log("user", user?.user);

    // createUserWithEmailAndPassword( email, password)
    //   .then((userCredentials) => {
    //     void updateProfile(userCredentials.user, {
    //       displayName: name,
    //     });
    //     toast({
    //       title: "Registered Sucessfully",
    //       description: userCredentials.user.email,
    //     });
    //   })
    //   .catch((error) => {
    //     toast({
    //       variant: "destructive",
    //       title: "Uh oh! Something went wrong.",
    //       description: `${error}`,
    //     });
    //   });
  }
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center">
      <div className="min-h-[650px] w-64 rounded-md bg-slate-300 p-5 shadow-md">
        <h3>Login Form</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>This is your email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="shadcn"
                        {...field}
                      />
                      <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                        {showPassword ? (
                          <HiEyeOff
                            className="h-6 w-6"
                            onClick={togglePasswordVisibility}
                          />
                        ) : (
                          <HiEye
                            className="h-6 w-6"
                            onClick={togglePasswordVisibility}
                          />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>This is your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
        <div className="mt-10 text-center">Don&apost have an account?</div>
        <Button className="w-full" onClick={() => router.push("/register")}>
          Register
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
