"use client"

import { useState, useEffect, useRef } from "react"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UseFormReturn } from "react-hook-form"

type CityOption = { label: string; value: string }

type CityComboboxProps = {
  form: UseFormReturn<any>
  index: number
}

export function CityCombobox({ form, index }: CityComboboxProps) {
  const [query, setQuery] = useState("")
  const [options, setOptions] = useState<CityOption[]>([])
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  const fieldName = `addresses.${index}.city`
  const containerRef = useRef<HTMLDivElement>(null)

  // Fetch city list based on query
  useEffect(() => {
    if (query.length < 2) {
      setOptions([])
      return
    }

    const fetchCities = async () => {
      const res = await fetch(
        `https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&q=${encodeURIComponent(query)}`
      )
      const data = await res.json()
      const cities = data.result.records.map((city: any) => ({
        label: city["שם_ישוב"],
        value: city["סמל_ישוב"],
      }))
      setOptions(cities)
    }

    const timeout = setTimeout(fetchCities, 300)
    return () => clearTimeout(timeout)
  }, [query])

  // Close dropdown when clicking outside
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
          <FormLabel>עיר</FormLabel>
          <FormControl>
            {selectedLabel ? (
              <div className="flex justify-between items-center bg-muted px-3 py-2 rounded-md">
                <span>{selectedLabel}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedLabel(null)
                    setQuery("")
                    form.setValue(fieldName, "")
                  }}
                >
                  שנה עיר
                </Button>
              </div>
            ) : (
              <div className="relative">
                <Input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setShowDropdown(true)
                  }}
                  placeholder="הקלד שם עיר"
                  autoComplete="off"
                />
                {showDropdown && options.length > 0 && (
                  <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-md">
                    {options.map((city) => (
                      <li
                        key={city.value}
                        onClick={() => {
                          field.onChange(city.value)
                          setSelectedLabel(city.label)
                          setQuery(city.label)
                          setShowDropdown(false)
                        }}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      >
                        {city.label}
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
