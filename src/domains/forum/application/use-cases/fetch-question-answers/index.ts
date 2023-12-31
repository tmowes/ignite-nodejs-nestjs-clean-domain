import { AnswersRepository } from '@domains/forum/application/repositories/answers-repository'
import { right } from '@core/entities/either'
import { Injectable } from '@nestjs/common'

import { FetchQuestionAnswersUseCaseRequest, FetchQuestionAnswersUseCaseResponse } from './types'

@Injectable()
export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page })

    return right({ answers })
  }
}
