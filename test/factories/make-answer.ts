import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Answer } from '@domains/forum/enterprise/entities/answer'
import { AnswerProps } from '@domains/forum/enterprise/entities/answer/types'
import { PrismaAnswerMapper } from '@infra/database/prisma/mappers/prisma-answer-mapper'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id: UniqueEntityID | undefined = undefined,
) {
  return Answer.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.paragraphs(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class AnswerFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswer(data: Partial<AnswerProps> = {}): Promise<Answer> {
    const answer = makeAnswer(data)
    await this.prisma.answer.create({ data: PrismaAnswerMapper.toPrisma(answer) })
    return answer
  }
}
