import { Either } from '@core/entities/either'
import { CommentWithAuthor } from '@domains/forum/enterprise/entities/value-objects/comment-with-author'

export type FetchCommentsOnAnswerUseCaseRequest = {
  answerId: string
  page: number
}

export type FetchCommentsOnAnswerUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>
