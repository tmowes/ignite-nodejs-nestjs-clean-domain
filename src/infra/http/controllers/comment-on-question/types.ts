import { z } from 'zod'

import { commentOnQuestionBodySchema } from './schema'

export type CommentOnQuestionBodySchema = z.infer<typeof commentOnQuestionBodySchema>
