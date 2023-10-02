import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Notification } from '@domains/notification/enterprise/entities/notification'
import { NotificationProps } from '@domains/notification/enterprise/entities/notification/types'
import { faker } from '@faker-js/faker'
import { PrismaNotificationMapper } from '@infra/database/prisma/mappers/prisma-notification-mapper'
import { PrismaService } from '@infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id: UniqueEntityID | undefined = undefined,
) {
  return Notification.create(
    {
      recipientId: new UniqueEntityID(),
      title: faker.lorem.sentence(4),
      content: faker.lorem.sentence(10),
      ...override,
    },
    id,
  )
}

@Injectable()
export class NotificationFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaNotification(data: Partial<NotificationProps> = {}): Promise<Notification> {
    const notification = makeNotification(data)
    await this.prisma.notification.create({ data: PrismaNotificationMapper.toPrisma(notification) })
    return notification
  }
}
