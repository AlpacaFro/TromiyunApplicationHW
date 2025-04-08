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
      <h3 className="font-bold text-lg">כתובת / Address</h3>

      {fields.map((field, index) => {
        const cityId = form.watch(`addresses.${index}.city`)

        return (
          <div
            key={field.id}
            className="grid grid-cols-4 grid-rows-3 gap-4 p-4 border rounded-md"
          >
            {/* עיר */}
            <div className="col-span-2">
              <CityCombobox form={form} index={index} />
            </div>

            {/* רחוב */}
            <div className="col-span-2">
              {cityId ? (
                <StreetCombobox form={form} index={index} cityId={cityId} />
              ) : (
                <div className="text-sm text-muted-foreground mt-7">
                  נא לבחור עיר לפני בחירת רחוב
                </div>
              )}
            </div>

            {/* מספר בית */}
            <div>
              <FormField
                control={form.control}
                name={`addresses.${index}.number`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>מספר בית</FormLabel>
                    <FormControl>
                      <Input placeholder="34" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* סוג כתובת */}
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
                        <option value="work">עבודה / Work</option>
                        <option value="home">בית / Home</option>
                        <option value="other">אחר / Other</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* הערות */}
            <div className="row-start-3 col-span-3">
              <FormField
                control={form.control}
                name={`addresses.${index}.comments`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>הערות</FormLabel>
                    <FormControl>
                      <Input placeholder="הכנס הערות" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* כפתור הסרה */}
            <div className="col-span-1 row-start-3 mt-5 text-end">
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                הסר כתובת
              </Button>
            </div>
          </div>
        )
      })}

      {/* כפתור הוספת כתובת */}
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
        הוסף כתובת נוספת
      </Button>
    </div>
  )
}
