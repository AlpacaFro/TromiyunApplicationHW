"use client"

import { useEffect, useRef, useState } from "react"
import { UseFormReturn } from "react-hook-form"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type StreetOption = {
  label: string
  value: string
}

type StreetComboboxProps = {
  form: UseFormReturn<any>
  index: number
  cityId: string | undefined
}

export function StreetCombobox({ form, index, cityId }: StreetComboboxProps) {
  const [query, setQuery] = useState("")
  const [options, setOptions] = useState<StreetOption[]>([])
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const fieldName = `addresses.${index}.streetCode`

  useEffect(() => {

    if (!cityId || query.length < 2) {
      setOptions([])
      return
    }

    const fetchStreets = async () => {
      const url = `/api/streets?q=${encodeURIComponent(query)}&city=${cityId}`
      

      try {
        const res = await fetch(url)
        const data = await res.json()
        console.log("Response data:", data)

        if (Array.isArray(data)) {
          setOptions(data)
        } else {
          console.warn("Unexpected response structure:", data)
        }
      } catch (error) {
        console.error("Failed to fetch streets:", error)
      }
    }

    const timeout = setTimeout(fetchStreets, 300)
    return () => clearTimeout(timeout)
  }, [query, cityId])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem ref={containerRef}>
          <FormLabel>רחוב</FormLabel>
          <FormControl>
            {selectedLabel ? (
              <div className="flex justify-between items-center bg-muted px-3 py-2 rounded-md">
                <span>{selectedLabel}</span>
                <button
                  type="button"
                  className="text-sm text-blue-600 underline"
                  onClick={() => {
                    setSelectedLabel(null)
                    setQuery("")
                    form.setValue(fieldName, "")
                  }}
                >
                  שנה רחוב
                </button>
              </div>
            ) : (
              <div className="relative">
                <Input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setShowDropdown(true)
                  }}
                  placeholder="הקלד שם רחוב"
                  disabled={!cityId}
                  autoComplete="off"
                />
                {showDropdown && options.length > 0 && (
                  <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-md">
                    {options.map((street) => (
                      <li
                        key={street.value}
                        onClick={() => {
                          field.onChange(String(street.value))
                          setSelectedLabel(street.label)
                          setQuery(street.label)
                          setShowDropdown(false)
                        }}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {street.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
