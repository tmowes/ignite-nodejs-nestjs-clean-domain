import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { AnswerComment } from '@domains/forum/enterprise/entities/answer-comment'
import { AnswerCommentProps } from '@domains/forum/enterprise/entities/answer-comment/types'
import { PrismaAnswerCommentMapper } from '@infra/database/prisma/mappers/prisma-answer-comment-mapper'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id: UniqueEntityID | undefined = undefined,
) {
  return AnswerComment.create(
    {
      answerId: new UniqueEntityID(),
      authorId: new UniqueEntityID(),
      content: faker.lorem.paragraphs(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class AnswerCommentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswerComment(data: Partial<AnswerCommentProps> = {}): Promise<AnswerComment> {
    const answerComment = makeAnswerComment(data)
    await this.prisma.comment.create({ data: PrismaAnswerCommentMapper.toPrisma(answerComment) })
    return answerComment
  }
}
