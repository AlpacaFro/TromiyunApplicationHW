"use client"

import { useFieldArray, UseFormReturn } from "react-hook-form"
import { useState } from "react"
import { CirclePlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

type Phone = {
  prefix: string
  number: string
  type: "mobile" | "home" | "work"
  isMain: boolean
}

type PhoneFormProps = {
  form: UseFormReturn<any>
}

export const PhoneFields = ({ form }: PhoneFormProps) => {
  const phonestyle = "border border-black"
  const israelPrefixes = [
    "050", "051", "052", "053", "054", "055",
    "056", "057", "058", "059", "02", "03", "04", "08", "09"
  ]

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "phones",
  })

  const [mainPhoneIndex, setMainPhoneIndex] = useState(0)

  return (
    <div className="space-y-2">
      <h3 className="font-bold text-lg mb-3">מספר טלפון </h3>
      <p className="text-gray-500 text-sm mb-3">.יש להזין לפחות מספר אחד </p>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-6 grid-rows-2 gap-2 bg-gray-300 p-3 rounded-md shadow-md"
        >
          <FormField
            control={form.control}
            name={`phones.${index}.prefix`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>קידומת</FormLabel>
                <FormControl>
                  <select {...field} className="border border-black rounded p-1">
                    {israelPrefixes.map((prefix) => (
                      <option key={prefix} value={prefix} className={phonestyle}>
                        {prefix}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`phones.${index}.number`}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>מספר</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="1234567" className={phonestyle} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`phones.${index}.type`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>סוג</FormLabel>
                <FormControl>
                  <select {...field} className="border border-black rounded-lg p-1">
                    <option value="mobile">נייד</option>
                    <option value="home">בית</option>
                    <option value="work">עבודה</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-1 row-start-2 text-end">
            {fields.length > 1 && (
              <Button
                variant="destructive"
                type="button"
                onClick={() => remove(index)}
              >
                הסר
              </Button>
            )}
          </div>

          <FormItem className="col-span-1 row-start-2">
            <FormLabel>ראשי</FormLabel>
            <FormControl>
              <div className="flex items-center h-full">
                <input
                  type="radio"
                  name="mainPhone"
                  checked={mainPhoneIndex === index}
                  disabled={fields.length === 1}
                  onChange={() => {
                    setMainPhoneIndex(index)
                    const updated = form.getValues("phones").map((p: Phone, i: number): Phone => ({
                      ...p,
                      isMain: i === index,
                    }))
                    form.setValue("phones", updated)
                  }}
                />
              </div>
            </FormControl>
          </FormItem>
        </div>
      ))}

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="bg-gray-300"
        onClick={() =>
          append({
            prefix: "050",
            number: "",
            type: "mobile",
            isMain: fields.length === 0,
          })
        }
      >
        <CirclePlus color="#5D3FD3" />
      </Button>
    </div>
  )
}
