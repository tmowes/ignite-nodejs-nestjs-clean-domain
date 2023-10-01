import { PaginationParams } from '@core/repositories/pagination-params'
import { AnswerComment } from '@domains/forum/enterprise/entities/answer-comment'
import { CommentWithAuthor } from '@domains/forum/enterprise/entities/value-objects/comment-with-author'

export abstract class AnswerCommentsRepository {
  abstract create(answerComment: AnswerComment): Promise<void>

  abstract delete(answerComment: AnswerComment): Promise<void>

  abstract findById(id: string): Promise<AnswerComment | null>

  abstract findManyByAnswerId(id: string, { page }: PaginationParams): Promise<AnswerComment[]>

  abstract findManyByAnswerIdWithAuthor(
    answerId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]>
}
