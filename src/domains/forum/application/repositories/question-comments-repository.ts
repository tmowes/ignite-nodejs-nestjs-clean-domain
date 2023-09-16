import { PaginationParams } from '@core/repositories/pagination-params'
import { QuestionComment } from '@domains/forum/enterprise/entities/question-comment'

export abstract class QuestionCommentsRepository {
  abstract create(questionComment: QuestionComment): Promise<void>

  abstract delete(questionComment: QuestionComment): Promise<void>

  abstract findById(id: string): Promise<QuestionComment | null>

  abstract findManyByQuestionId(id: string, params: PaginationParams): Promise<QuestionComment[]>
}
