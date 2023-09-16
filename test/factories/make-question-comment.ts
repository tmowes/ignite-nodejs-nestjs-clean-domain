import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { QuestionComment } from '@domains/forum/enterprise/entities/question-comment'
import { QuestionCommentProps } from '@domains/forum/enterprise/entities/question-comment/types'
import { PrismaQuestionCommentMapper } from '@infra/database/prisma/mappers/prisma-question-comment-mapper'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id: UniqueEntityID | undefined = undefined,
) {
  return QuestionComment.create(
    {
      questionId: new UniqueEntityID(),
      authorId: new UniqueEntityID(),
      content: faker.lorem.paragraphs(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class QuestionCommentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestionComment(data: Partial<QuestionCommentProps> = {}): Promise<QuestionComment> {
    const questionComment = makeQuestionComment(data)
    await this.prisma.comment.create({ data: PrismaQuestionCommentMapper.toPrisma(questionComment) })
    return questionComment
  }
}
