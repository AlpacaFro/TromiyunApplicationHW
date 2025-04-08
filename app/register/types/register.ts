import { z } from "zod"
import { registerSchema } from "../schemas/registerSchema"

export type RegisterFormData = z.infer<typeof registerSchema>
export type Phone = z.infer<typeof registerSchema.shape.phones.element>
export type Address = z.infer<typeof registerSchema.shape.addresses.element>
