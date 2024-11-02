import { z } from 'zod'

const testsFilterSchema = z.object({
  search: z.string(),
  type: z.string(),
})

export type ITestsFilter = z.infer<typeof testsFilterSchema>
