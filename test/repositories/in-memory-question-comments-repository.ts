import { DomainEvents } from '@core/events/domain-events'
import { PaginationParams } from '@core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@domains/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@domains/forum/enterprise/entities/question-comment'
import { CommentWithAuthor } from '@domains/forum/enterprise/entities/value-objects/comment-with-author'

import { InMemoryStudentsRepository } from './in-memory-students-repository'

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = []

  constructor(private studentsRepository: InMemoryStudentsRepository) {}

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
    DomainEvents.dispatchEventsForAggregate(questionComment.id)
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === questionComment.id)
    this.items.splice(index, 1)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    return this.items.find((item) => item.id.toString() === id) ?? null
  }

  async findManyByQuestionId(id: string, { page }: PaginationParams): Promise<QuestionComment[]> {
    return this.items
      .filter((item) => item.questionId.toString() === id)
      .slice((page - 1) * 20, page * 20)
  }

  async findManyByQuestionIdWithAuthor(questionId: string, { page }: PaginationParams) {
    return this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)
      .map((comment) => {
        const author = this.studentsRepository.items.find((student) =>
          student.id.equals(comment.authorId),
        )

        if (!author) {
          throw new Error(`Author with ID "${comment.authorId.toString()} does not exist."`)
        }

        return CommentWithAuthor.create({
          commentId: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          authorId: comment.authorId,
          author: author.name,
        })
      })
  }
}
