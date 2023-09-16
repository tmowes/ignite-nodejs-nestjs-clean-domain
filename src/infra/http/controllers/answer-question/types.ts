import { z } from 'zod'

import { answerQuestionBodySchema } from './schema'

export type AnswerQuestionBodySchema = z.infer<typeof answerQuestionBodySchema>
