import { Either } from '@core/entities/either'
import { CommentWithAuthor } from '@domains/forum/enterprise/entities/value-objects/comment-with-author'

export type FetchCommentsOnQuestionUseCaseRequest = {
  questionId: string
  page: number
}

export type FetchCommentsOnQuestionUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>
