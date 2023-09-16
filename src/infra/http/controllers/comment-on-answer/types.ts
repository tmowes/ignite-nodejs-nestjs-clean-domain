import { z } from 'zod'

import { commentOnAnswerBodySchema } from './schema'

export type CommentOnAnswerBodySchema = z.infer<typeof commentOnAnswerBodySchema>
