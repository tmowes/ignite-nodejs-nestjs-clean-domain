import { UniqueEntityID } from '@core/entities/unique-entity-id'

export interface CommentWithAuthorProps {
  commentId: UniqueEntityID
  content: string
  authorId: UniqueEntityID
  author: string
  createdAt: Date
  updatedAt?: Date | null
}
