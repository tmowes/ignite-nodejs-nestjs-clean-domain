import { AnswerCommentsRepository } from '@domains/forum/application/repositories/answer-comments-repository'
import { right } from '@core/entities/either'
import { Injectable } from '@nestjs/common'

import { FetchCommentsOnAnswerUseCaseRequest, FetchCommentsOnAnswerUseCaseResponse } from './types'

@Injectable()
export class FetchCommentsOnAnswerUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchCommentsOnAnswerUseCaseRequest): Promise<FetchCommentsOnAnswerUseCaseResponse> {
    const comments = await this.answerCommentsRepository.findManyByAnswerIdWithAuthor(answerId, {
      page,
    })

    return right({ comments })
  }
}
