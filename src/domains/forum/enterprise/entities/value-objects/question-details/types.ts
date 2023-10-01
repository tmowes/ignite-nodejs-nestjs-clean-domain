import { UniqueEntityID } from '@core/entities/unique-entity-id'

import { Slug } from '../slug'
import { Attachment } from '../../attachment'

export interface QuestionDetailsProps {
  questionId: UniqueEntityID
  authorId: UniqueEntityID
  author: string
  title: string
  content: string
  slug: Slug
  attachments: Attachment[]
  bestAnswerId?: UniqueEntityID | null
  createdAt: Date
  updatedAt?: Date | null
}
