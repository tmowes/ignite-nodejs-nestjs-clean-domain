import { PaginationParams } from '@core/repositories/pagination-params'
import { AnswerComment } from '@domains/forum/enterprise/entities/answer-comment'

export abstract class AnswerCommentsRepository {
  abstract create(answerComment: AnswerComment): Promise<void>

  abstract delete(answerComment: AnswerComment): Promise<void>

  abstract findById(id: string): Promise<AnswerComment | null>

  abstract findManyByAnswerId(id: string, { page }: PaginationParams): Promise<AnswerComment[]>
}
