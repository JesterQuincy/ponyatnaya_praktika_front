import { z } from 'zod'

export const surveySchema = z.object({
  priority: z.string().min(1, 'Выберите один из вариантов'),
  favoriteColors: z.array(z.string()).min(1, 'Выберите хотя бы один цвет'),
  stressManagement: z.string().min(1, 'Выберите один из вариантов'),
  support: z.string().min(1, 'Выберите один из вариантов'),
  sessionsSatisfaction: z.string().min(1, 'Выберите один из вариантов'),
})
