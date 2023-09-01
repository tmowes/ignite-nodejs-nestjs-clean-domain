import { AnswerAttachmentsRepository } from '@domains/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@domains/forum/enterprise/entities/answer-attachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerAttachmentsRepository implements AnswerAttachmentsRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteManyByAnswerId(answerId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
