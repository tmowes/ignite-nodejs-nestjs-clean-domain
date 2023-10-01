import { DomainEvents } from '@core/events/domain-events'
import { PaginationParams } from '@core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@domains/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@domains/forum/enterprise/entities/answer-comment'
import { CommentWithAuthor } from '@domains/forum/enterprise/entities/value-objects/comment-with-author'

import { InMemoryStudentsRepository } from './in-memory-students-repository'

export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository {
  public items: AnswerComment[] = []

  constructor(private studentsRepository: InMemoryStudentsRepository) {}

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
    DomainEvents.dispatchEventsForAggregate(answerComment.id)
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answerComment.id)
    this.items.splice(index, 1)
  }

  async findById(id: string): Promise<AnswerComment | null> {
    return this.items.find((item) => item.id.toString() === id) ?? null
  }

  async findManyByAnswerId(id: string, { page }: PaginationParams): Promise<AnswerComment[]> {
    return this.items
      .filter((item) => item.answerId.toString() === id)
      .slice((page - 1) * 20, page * 20)
  }

  async findManyByAnswerIdWithAuthor(answerId: string, { page }: PaginationParams) {
    return this.items
      .filter((item) => item.answerId.toString() === answerId)
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
