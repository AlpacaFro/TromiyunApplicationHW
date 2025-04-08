"use client";

import axios from "axios"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod";
import { useState } from "react";
import { PhoneFields } from "./PhoneField";
import { HmoCarousel } from "./HmoCarousel";
import { AddressFields } from "./AddressFields";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerSchema } from "@/app/register/schemas/registerSchema";
import type { RegisterFormData } from "./types/register";

const RegisterForm = () => {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      id: "",
      firstName: "",
      lastName: "",
      hmo: "Clalit",
      phones: [
        {
          prefix: "050",
          number: "",
          type: "mobile",
          isMain: true,
        },
      ],
      addresses: [
        {
          city: "",
          streetCode: "",
          number: "",
          type: "home",
          comments: "",
        },
      ],
    },
  });

 
  const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
    console.log("JSON respond:", JSON.stringify(values, null, 2))
  
    try {
      const res = await axios.post("/api/submit", values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
  
      alert("Form submitted successfully!")
      console.log("Proxy response:", res.data)
    } catch (err) {
      console.error("Proxy send failed:", err)
      alert("Failed to submit form")
    }
  }
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto w-[480px] space-y-6 rounded-lg border bg-gray-300 p-6 shadow-md flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <h3 className="font-bold text-lg mb-2">תעודת זהות</h3>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder=".אנא הכנס את מספר תעודת הזהות שלך כאן"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <h3 className="font-bold text-lg mb-2">שם פרטי</h3>
              </FormLabel>
              <FormControl>
                <Input placeholder="אנא הכנס את שמך הפרטי" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="text-end">
              <FormLabel>
                <h3 className="font-bold text-lg mb-2">שם משפחה</h3>
              </FormLabel>
              <FormControl>
                <Input placeholder="אנא הכנס את שם המשפחה" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <PhoneFields form={form} />

        <AddressFields form={form} />

        <HmoCarousel onSelect={(value) => form.setValue("hmo", value)} />

        <Button>הרשם</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;