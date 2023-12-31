import { Either } from '@core/entities/either'
import { Answer } from '@domains/forum/enterprise/entities/answer'

export type AnswerQuestionUseCaseRequest = {
  authorId: string
  questionId: string
  content: string
  attachmentsIds: string[]
}

export type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>
