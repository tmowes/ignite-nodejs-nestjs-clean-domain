import { PaginationParams } from '@core/repositories/pagination-params'
import { QuestionsRepository } from '@domains/forum/application/repositories/questions-repository'
import { Question } from '@domains/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'
import { QuestionAttachmentsRepository } from '@domains/forum/application/repositories/question-attachments-repository'
import { QuestionDetails } from '@domains/forum/enterprise/entities/value-objects/question-details'
import { DomainEvents } from '@core/events/domain-events'
import { CacheRepository } from '@infra/cache/cache-repository'

import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'
import { PrismaQuestionDetailsMapper } from '../mappers/prisma-question-details-mapper'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(
    private prisma: PrismaService,
    private cache: CacheRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({ where: { id } })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({ where: { slug } })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findManyRecent(params: PaginationParams): Promise<Question[]> {
    const { page } = params
    const questions = await this.prisma.question.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map(PrismaQuestionMapper.toDomain)
  }

  async findDetailsBySlug(slug: string): Promise<QuestionDetails | null> {
    const cacheHit = await this.cache.get(`question:${slug}:details`)

    if (cacheHit) {
      return JSON.parse(cacheHit)
    }

    const question = await this.prisma.question.findUnique({
      where: { slug },
      include: {
        author: true,
        attachments: true,
      },
    })

    if (!question) {
      return null
    }

    const questionDetails = PrismaQuestionDetailsMapper.toDomain(question)

    await this.cache.set(`question:${slug}:details`, JSON.stringify(questionDetails))

    return questionDetails
  }

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.create({ data })
    await this.questionAttachmentsRepository.createMany(question.attachments.getItems())
    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async save(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.update({ where: { id: question.id.toString() }, data })
    await Promise.all([
      this.questionAttachmentsRepository.createMany(question.attachments.getNewItems()),
      this.questionAttachmentsRepository.deleteMany(question.attachments.getRemovedItems()),
      this.cache.delete(`question:${data.slug}:details`),
    ])
    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)
    await this.prisma.question.delete({ where: { id: data.id } })
  }
}
