import { z } from 'zod'

export const mainHypothesesShema = z.object({
  data: z.string(),
})
