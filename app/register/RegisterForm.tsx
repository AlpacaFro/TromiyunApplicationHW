"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
          city: "971",
          streetCode: "55264",
          number: "34",
          type: "work",
          comments: "IITC-College",
        },
      ],
    },
  });

  const handleSubmit = (values: RegisterFormData) => {
    console.log("Submitted values:", values);
    alert("Form submitted successfully!");
  };

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
                <h3 className="font-bold text-lg mb-2">תעודת זהות / ID</h3>
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
                <h3 className="font-bold text-lg mb-2">שם פרטי / First Name</h3>
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
                <h3 className="font-bold text-lg mb-2">שם משפחה / Last Name</h3>
              </FormLabel>
              <FormControl>
                <Input placeholder="אנא הכנס את שם המשפחה" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <HmoCarousel onSelect={(value) => form.setValue("hmo", value)} />

        <PhoneFields form={form} />

        <AddressFields form={form} />

        <Button>הרשם/ sign up</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;