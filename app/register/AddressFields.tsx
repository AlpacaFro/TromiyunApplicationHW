"use client"

import { CityCombobox } from "./Addresses/CityComboBox"
import { StreetCombobox } from "./Addresses/StreetCombobox"
import { UseFormReturn, useFieldArray } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

type AddressFieldsProps = {
  form: UseFormReturn<any>
}

export function AddressFields({ form }: AddressFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "addresses",
  })

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-lg">כתובת</h3>

      {fields.map((field, index) => {
        const cityId = form.watch(`addresses.${index}.city`)

        return (
          <div
            key={field.id}
            className="grid grid-cols-4 grid-rows-3 gap-4 p-4 border rounded-md"
          >
            <div className="col-span-2">
              <CityCombobox form={form} index={index} />
            </div>

            <div className="col-span-2">
              {cityId ? (
                <StreetCombobox form={form} index={index} cityId={cityId} />
              ) : (
                <div className="text-sm text-muted-foreground mt-7">
                  יש לבחור עיר קודם
                  <br />
                </div>
              )}
            </div>

            <div>
              <FormField
                control={form.control}
                name={`addresses.${index}.number`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>מס' בית</FormLabel>
                    <FormControl>
                      <Input placeholder="34" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name={`addresses.${index}.type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>סוג כתובת</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full border rounded px-2 py-1 bg-white"
                      >
                        <option value="work">בית</option>
                        <option value="home">עבודה</option>
                        <option value="other">אחר</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="row-start-3 col-span-3">
              <FormField
                control={form.control}
                name={`addresses.${index}.comments`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>הערות</FormLabel>
                    <FormControl>
                      <Input placeholder="...א' , בית קרקע" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {fields.length > 1 ? (
              <div className="col-span-1 row-start-3 mt-5 text-end">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  הסר כתובת
                </Button>
              </div>
            ) : (
              <div className="col-span-1 row-start-3 mt-5 text-end">
              </div>
            )}
          </div>
        )
      })}

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({
            city: "",
            streetCode: "",
            number: "",
            type: "home",
            comments: "",
          })
        }
      >
        הוסף כתובת
      </Button>
    </div>
  )
}
