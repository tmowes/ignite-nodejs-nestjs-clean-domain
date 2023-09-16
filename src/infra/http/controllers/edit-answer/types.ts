import { z } from 'zod'

import { editAnswerBodySchema } from './schema'

export type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>
