import { Module } from '@nestjs/common'
import { OnAnswerCreated } from '@domains/notification/application/subscribers/on-answer-created'
import { OnQuestionBestAnswerChosen } from '@domains/notification/application/subscribers/on-chosen-question-best-answer'
import { SendNotificationUseCase } from '@domains/notification/application/use-cases/send-notification'

import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [OnAnswerCreated, OnQuestionBestAnswerChosen, SendNotificationUseCase],
})
export class EventsModule {}
