import { UniqueEntityID } from '@core/entities/unique-entity-id'
import { Question } from '@domains/forum/enterprise/entities/question'
import { QuestionsRepository } from '@domains/forum/application/repositories/questions-repository'
import { QuestionAttachment } from '@domains/forum/enterprise/entities/question-attachment'
import { QuestionAttachmentList } from '@domains/forum/enterprise/entities/question-attachment-list'
import { right } from '@core/entities/either'
import { Injectable } from '@nestjs/common'

import { CreateQuestionUseCaseRequest, CreateQuestionUseCaseResponse } from './types'

@Injectable()
export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(props: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const { authorId, title, content, attachmentsIds } = props

    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    })

    const questionAttachments = attachmentsIds.map((attachmentId) =>
      QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      }),
    )

    question.attachments = new QuestionAttachmentList(questionAttachments)

    await this.questionsRepository.create(question)

    return right({ question })
  }
}
