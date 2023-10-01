import { left, right } from '@core/entities/either'
import { Attachment } from '@domains/forum/enterprise/entities/attachment'
import { Injectable } from '@nestjs/common'
import { InvalidAttachmentTypeError } from '@core/errors/invalid-attachment-type-error'

import { AttachmentsRepository } from '../../repositories/attachments-repository'
import { UploadAndCreateAttachmentRequest, UploadAndCreateAttachmentResponse } from './types'
import { Uploader } from '../../storage/uploader'

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(private attachmentsRepository: AttachmentsRepository, private uploader: Uploader) {}

  async execute(props: UploadAndCreateAttachmentRequest): Promise<UploadAndCreateAttachmentResponse> {
    const { fileName, fileType, body } = props
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAttachmentTypeError(fileType))
    }

    const { url } = await this.uploader.upload({ fileName, fileType, body })

    const attachment = Attachment.create({ title: fileName, url })

    await this.attachmentsRepository.create(attachment)

    return right({ attachment })
  }
}
