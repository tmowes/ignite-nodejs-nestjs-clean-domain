import { Question } from '@domains/forum/enterprise/entities/question'
import { QuestionsRepository } from '@domains/forum/application/repositories/questions-repository'
import { PaginationParams } from '@core/repositories/pagination-params'
import { DomainEvents } from '@core/events/domain-events'
import { QuestionDetails } from '@domains/forum/enterprise/entities/value-objects/question-details'

import { InMemoryAttachmentsRepository } from './in-memory-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from './in-memory-question-attachments-repository'
import { InMemoryStudentsRepository } from './in-memory-students-repository'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository,
    private attachmentsRepository: InMemoryAttachmentsRepository,
    private studentsRepository: InMemoryStudentsRepository,
  ) {}

  async create(question: Question) {
    this.items.push(question)
    await this.questionAttachmentsRepository.createMany(question.attachments.getItems())
    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async save(question: Question): Promise<void> {
    const index = this.items.findIndex((item) => item.id === question.id)
    this.items[index] = question
    await this.questionAttachmentsRepository.createMany(question.attachments.getNewItems())
    await this.questionAttachmentsRepository.deleteMany(question.attachments.getRemovedItems())
    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Question): Promise<void> {
    const index = this.items.findIndex((item) => item.id === question.id)
    this.items.splice(index, 1)
    this.questionAttachmentsRepository.deleteManyByQuestionId(question.id.toString())
  }

  async findById(id: string): Promise<Question | null> {
    return this.items.find((item) => item.id.toString() === id) ?? null
  }

  async findBySlug(slug: string): Promise<Question | null> {
    return this.items.find((item) => item.slug.value === slug) ?? null
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    return this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)
  }

  async findDetailsBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)

    if (!question) {
      return null
    }

    const author = this.studentsRepository.items.find((student) => student.id.equals(question.authorId))

    if (!author) {
      throw new Error(`Author with ID "${question.authorId.toString()}" does not exist.`)
    }

    const questionAttachments = this.questionAttachmentsRepository.items.filter((questionAttachment) =>
      questionAttachment.questionId.equals(question.id),
    )

    const attachments = questionAttachments.map((questionAttachment) => {
      const attachment = this.attachmentsRepository.items.find(({ id }) =>
        id.equals(questionAttachment.attachmentId),
      )

      if (!attachment) {
        throw new Error(
          `Attachment with ID "${questionAttachment.attachmentId.toString()}" does not exist.`,
        )
      }

      return attachment
    })

    return QuestionDetails.create({
      questionId: question.id,
      authorId: question.authorId,
      author: author.name,
      title: question.title,
      slug: question.slug,
      content: question.content,
      bestAnswerId: question.bestAnswerId,
      attachments,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    })
  }
}
