"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const FormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(8, {
    message: "Enter a password with at least 8 characters",
  }),
});

const Page = () => {
  const { login, isLoading } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onsubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <h1>Log In</h1>
      <Button variant={"link"} className="text-gray-400">
        Don&apos;t have an account? Sign Up
      </Button>
      <div className="py-10 w-96">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="flex flex-col gap-4 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      className="text-black"
                      {...field}
                    />
                  </FormControl>
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
                    <Input
                      placeholder="Password"
                      type="password"
                      className="text-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {isLoading ? (
                <div className="flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging In
                </div>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Page;