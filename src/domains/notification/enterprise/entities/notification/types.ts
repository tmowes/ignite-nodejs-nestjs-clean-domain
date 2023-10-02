import { UniqueEntityID } from '@core/entities/unique-entity-id'

export type NotificationProps = {
  recipientId: UniqueEntityID
  title: string
  content: string
  readAt?: Date | null
  createdAt: Date
}
