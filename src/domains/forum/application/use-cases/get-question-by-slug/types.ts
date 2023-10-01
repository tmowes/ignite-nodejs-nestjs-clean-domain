import { Either } from '@core/entities/either'
import { ResourceNotFoundError } from '@core/errors/resource-not-found'
import { QuestionDetails } from '@domains/forum/enterprise/entities/value-objects/question-details'

export type GetQuestionBySlugUseCaseRequest = {
  slug: string
}

export type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: QuestionDetails
  }
>
