"use client";
import z from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { PhoneFields } from "./PhoneField";
import { HmoCarousel } from "./HmoCarousel";


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



const phoneSchema = z.object({
    prefix: z.enum([
      "050", "051", "052", "053", "054", "055", "056", "057", "058", "059",
    ]),
    number: z.string().regex(/^\d{7}$/, "Must be exactly 7 digits"),
    type: z.enum(["mobile", "home", "work"]),
    isMain: z.boolean(),
  });

const formSchema = z.object({
  id: z.string().regex(/^\d{9}$/, "Israeli ID must be exactly 9 digits"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  hmo: z.enum(["Clalit", "Maccabi", "Mehuedet", "Leumit"], {
    required_error: "יש לבחור קופת חולים",
  }),
  phones: z.array(phoneSchema).min(1, "Has to have at least one phone"),
});



const RegisterForm = () => {
  const israelPrefixes = [
    "050", "051", "052", "053", "054", "055", "056", "057", "058", "059","02","03","04","08","09"
  ];


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
          }
        ],
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitted values:", values);
    alert("Form submitted successfully!");
  };

  return (
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto w-[480px] space-y-6 rounded-lg border bg-gray-300 p-6 shadow-md  flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel><h3 className="font-bold text-lg  mb-2">תעודת זהות / ID</h3></FormLabel>
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
              <FormLabel><h3 className="font-bold text-lg  mb-2">שם פרטי / First Name</h3></FormLabel>
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
              <FormLabel><h3 className="font-bold text-lg mb-2">שם משפחה / Last Name</h3></FormLabel>
              <FormControl>
                <Input placeholder="אנא הכנס את שם המשפחה" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         <HmoCarousel 
         onSelect={
          (value) => form.setValue("hmo", value)
        } 
         />
         <PhoneFields form={form} />
         <Button>הרשם</Button>
      </form>
    </Form>
    
  );
};

export default RegisterForm;
