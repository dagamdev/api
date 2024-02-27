import { z } from 'zod'

const iconQueries = z.object({
  url: z.string().url().optional(),
  theme: z.literal('dark').or(z.literal('light')).optional()
})

export default {
  iconQueries
}
