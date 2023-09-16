import { z } from 'zod'

import { createQuestionBodySchema } from './schemas'

export type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>
