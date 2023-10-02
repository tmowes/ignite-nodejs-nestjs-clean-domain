import { ReadNotificationUseCase } from '@domains/notification/application/use-cases/read-notification'
import { CurrentUser } from '@infra/auth/current-user-decorator'
import { UserPayload } from '@infra/auth/jwt.strategy'
import { Controller, Patch, HttpCode, Param, BadRequestException } from '@nestjs/common'

@Controller('/notifications/:notificationId/read')
export class ReadNotificationController {
  constructor(private readNotification: ReadNotificationUseCase) {}

  @Patch()
  @HttpCode(204)
  async handle(@CurrentUser() user: UserPayload, @Param('notificationId') notificationId: string) {
    const result = await this.readNotification.execute({ notificationId, recipientId: user.sub })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
