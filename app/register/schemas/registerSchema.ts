import { z } from "zod"

export const phoneSchema = z.object({
  prefix: z.enum(["050", "051"]),
  number: z.string().regex(/^\d{7}$/),
  type: z.enum(["mobile", "home", "work"]),
  isMain: z.boolean(),
})

export const addressSchema = z.object({
  city: z.string().min(1),
  streetCode: z.string(),
  number: z.string(),
  type: z.enum(["home", "work", "other"]),
  comments: z.string().optional(),
})

export const registerSchema = z.object({
  id: z.string().length(9),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  hmo: z.enum(["Clalit", "Maccabi", "Mehuedet", "Leumit"]),
  phones: z.array(phoneSchema),
  addresses: z.array(addressSchema),
})
