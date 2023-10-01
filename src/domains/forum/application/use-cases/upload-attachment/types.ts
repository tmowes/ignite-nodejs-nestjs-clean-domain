import { Either } from '@core/entities/either'
import { InvalidAttachmentTypeError } from '@core/errors/invalid-attachment-type-error'
import { Attachment } from '@domains/forum/enterprise/entities/attachment'

export type UploadAndCreateAttachmentRequest = {
  fileName: string
  fileType: string
  body: Buffer
}

export type UploadAndCreateAttachmentResponse = Either<
  InvalidAttachmentTypeError,
  { attachment: Attachment }
>
