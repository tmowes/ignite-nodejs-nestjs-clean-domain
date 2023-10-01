import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { QuestionAttachment } from '@domains/forum/enterprise/entities/question-attachment'
import { QuestionAttachmentProps } from '@domains/forum/enterprise/entities/question-attachment/types'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id: UniqueEntityID | undefined = undefined,
) {
  return QuestionAttachment.create(
    {
      questionId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )
}

@Injectable()
export class QuestionAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestionAttachment(
    data: Partial<QuestionAttachmentProps> = {},
  ): Promise<QuestionAttachment> {
    const questionAttachment = makeQuestionAttachment(data)

    await this.prisma.attachment.update({
      where: { id: questionAttachment.attachmentId.toString() },
      data: { questionId: questionAttachment.questionId.toString() },
    })

    return questionAttachment
  }
}
