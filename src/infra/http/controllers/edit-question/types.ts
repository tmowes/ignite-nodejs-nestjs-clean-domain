import { z } from 'zod'

import { editQuestionBodySchema } from './schema'

export type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>
