import { AttachmentsRepository } from '@domains/forum/application/repositories/attachments-repository'
import { Injectable } from '@nestjs/common'
import { Attachment } from '@domains/forum/enterprise/entities/attachment'

import { PrismaAttachmentMapper } from '../mappers/prisma-attachment-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPrisma(attachment)

    await this.prisma.attachment.create({ data })
  }
}
