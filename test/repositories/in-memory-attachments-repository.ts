import { AttachmentsRepository } from '@domains/forum/application/repositories/attachments-repository'
import { Attachment } from '@domains/forum/enterprise/entities/attachment'

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  public items: Attachment[] = []

  async create(attachment: Attachment) {
    this.items.push(attachment)
  }
}
