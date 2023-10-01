import { QuestionCommentsRepository } from '@domains/forum/application/repositories/question-comments-repository'
import { right } from '@core/entities/either'
import { Injectable } from '@nestjs/common'

import { FetchCommentsOnQuestionUseCaseRequest, FetchCommentsOnQuestionUseCaseResponse } from './types'

@Injectable()
export class FetchCommentsOnQuestionUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchCommentsOnQuestionUseCaseRequest): Promise<FetchCommentsOnQuestionUseCaseResponse> {
    const comments = await this.questionCommentsRepository.findManyByQuestionIdWithAuthor(questionId, {
      page,
    })

    return right({ comments })
  }
}
