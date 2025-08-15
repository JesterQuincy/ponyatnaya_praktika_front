import { z } from 'zod'

export const mainHypothesesShema = z.object({
  data: z.string().max(250, 'Ограничение в 250 символов'),
})
