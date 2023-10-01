import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { AnswerAttachment } from '@domains/forum/enterprise/entities/answer-attachment'
import { AnswerAttachmentProps } from '@domains/forum/enterprise/entities/answer-attachment/types'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id: UniqueEntityID | undefined = undefined,
) {
  return AnswerAttachment.create(
    {
      answerId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...override,
    },
    id,
  )
}
@Injectable()
export class AnswerAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswerAttachment(
    data: Partial<AnswerAttachmentProps> = {},
  ): Promise<AnswerAttachment> {
    const answerAttachment = makeAnswerAttachment(data)

    await this.prisma.attachment.update({
      where: { id: answerAttachment.attachmentId.toString() },
      data: { answerId: answerAttachment.answerId.toString() },
    })

    return answerAttachment
  }
}
