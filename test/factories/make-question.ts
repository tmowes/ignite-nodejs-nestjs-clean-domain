import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Question } from '@domains/forum/enterprise/entities/question'
import { QuestionProps } from '@domains/forum/enterprise/entities/question/types'
import { Slug } from '@domains/forum/enterprise/entities/value-objects/slug'
import { PrismaQuestionMapper } from '@infra/database/prisma/mappers/prisma-question-mapper'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id: UniqueEntityID | undefined = undefined,
) {
  return Question.create(
    {
      authorId: new UniqueEntityID(),
      title: faker.lorem.sentence(),
      slug: Slug.create('example-question'),
      content: faker.lorem.paragraphs(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class QuestionFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestion(data: Partial<QuestionProps> = {}): Promise<Question> {
    const question = makeQuestion(data)
    await this.prisma.question.create({ data: PrismaQuestionMapper.toPrisma(question) })
    return question
  }
}
