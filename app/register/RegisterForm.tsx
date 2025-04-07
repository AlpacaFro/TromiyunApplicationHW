"use client";
import z from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { PhoneFields } from "./PhoneField";


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
  phones: z.array(phoneSchema).min(1, "Has to have at least one phone"),
});

const RegisterForm = () => {
  const israelPrefixes = [
    "050", "051", "052", "053", "054", "055", "056", "057", "058", "059",
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        id: "",
        firstName: "",
        lastName: "",
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "phones",
  });

  const [mainPhoneIndex, setMainPhoneIndex] = useState(0);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitted values:", values);
    alert("בדיקה: הנתונים נשלחו לקונסול ✅");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto w-[480px] space-y-6 rounded-lg border bg-gray-300 p-6 shadow-md text-end flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>תעודת זהות / ID</FormLabel>
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
              <FormLabel>שם פרטי</FormLabel>
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
            <FormItem>
              <FormLabel>שם משפחה</FormLabel>
              <FormControl>
                <Input placeholder="אנא הכנס את שם המשפחה" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <PhoneFields form={form} />
         <Button>הרשם</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
