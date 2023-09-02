import { PaginationParams } from '@core/repositories/pagination-params'
import { Question } from '@domains/forum/enterprise/entities/question'

export abstract class QuestionsRepository {
  abstract create(question: Question): Promise<void>

  abstract delete(question: Question): Promise<void>

  abstract save(question: Question): Promise<void>

  abstract findBySlug(slug: string): Promise<Question | null>

  abstract findById(id: string): Promise<Question | null>

  abstract findManyRecent(params: PaginationParams): Promise<Question[]>
}
