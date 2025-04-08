"use client";
import z from "zod";
import { useForm, useFieldArray } from "react-hook-form";
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


//Schemas
const phoneSchema = z.object({
    prefix: z.enum([
      "050", "051", "052", "053", "054", "055", "056", "057", "058", "059",
    ]),
    number: z.string().regex(/^\d{7}$/, "Must be 7 digits"),
    type: z.enum(["mobile", "home", "work"]),
    isMain: z.boolean(),
  });

const addressSchema = z.object({
    city: z.string().min(1, " Provide a City"),
    streetCode: z.string().min(1, "Provide street address"),
    number: z.string().min(1, "Provide House Number"),
    type: z.enum(["home", "work", "other"]),
    comments: z.string().optional(),
  })

const formSchema = z.object({
  id: z.string().regex(/^\d{9}$/, "Israeli ID must be exactly 9 digits"),
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  hmo: z.enum(["Clalit", "Maccabi", "Mehuedet", "Leumit"], {
    required_error: "HMO hasn't picked yet",
  }),
  phones: z.array(phoneSchema).min(1, "Phone number is required"),
  addresses: z.array(addressSchema).min(1, "An Adress is required"),
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
        addresses:[
          {
            city:"971",
            streetCode:"55264",
            number:"34",
            type:"work",
            comments:"IITC-College",
          }
        ]
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

         <AddressFields form={form}/>
         
         <Button>הרשם/ sign up</Button>
      </form>
    </Form>
    
  );
};

export default RegisterForm;
