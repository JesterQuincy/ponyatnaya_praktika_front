import { z } from 'zod'

export const createMaterialSchema = z.object({
  name: z.string().min(1, 'Название не должно быть пустым'),
  type: z.string().optional(),
})

export type ICreateMaterial = z.infer<typeof createMaterialSchema>
