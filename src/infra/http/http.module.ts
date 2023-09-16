import { Module } from '@nestjs/common'
import { DatabaseModule } from '@infra/database/database.module'
import { CryptographyModule } from '@infra/cryptography/cryptography.module'
//
import { AnswerQuestionUseCase } from '@domains/forum/application/use-cases/answer-question'
import { AuthenticateStudentUseCase } from '@domains/forum/application/use-cases/authenticate-student'
import { ChooseQuestionBestAnswerUseCase } from '@domains/forum/application/use-cases/choose-question-best-answer'
import { CommentOnAnswerUseCase } from '@domains/forum/application/use-cases/comment-on-answer'
import { CommentOnQuestionUseCase } from '@domains/forum/application/use-cases/comment-on-question'
import { CreateQuestionUseCase } from '@domains/forum/application/use-cases/create-question'
import { DeleteAnswerUseCase } from '@domains/forum/application/use-cases/delete-answer'
import { DeleteCommentOnAnswerUseCase } from '@domains/forum/application/use-cases/delete-comment-on-answer'
import { DeleteCommentOnQuestionUseCase } from '@domains/forum/application/use-cases/delete-comment-on-question'
import { DeleteQuestionUseCase } from '@domains/forum/application/use-cases/delete-question'
import { EditAnswerUseCase } from '@domains/forum/application/use-cases/edit-answer'
import { EditQuestionUseCase } from '@domains/forum/application/use-cases/edit-question'
import { FetchCommentsOnAnswerUseCase } from '@domains/forum/application/use-cases/fetch-comments-on-answer'
import { FetchCommentsOnQuestionUseCase } from '@domains/forum/application/use-cases/fetch-comments-on-question'
import { FetchQuestionAnswersUseCase } from '@domains/forum/application/use-cases/fetch-question-answers'
import { FetchRecentQuestionsUseCase } from '@domains/forum/application/use-cases/fetch-recent-questions'
import { GetQuestionBySlugUseCase } from '@domains/forum/application/use-cases/get-question-by-slug'
import { RegisterStudentUseCase } from '@domains/forum/application/use-cases/register-student'

import { AnswerQuestionController } from './controllers/answer-question'
import { AuthenticateController } from './controllers/authenticate'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer'
import { CommentOnAnswerController } from './controllers/comment-on-answer'
import { CommentOnQuestionController } from './controllers/comment-on-question'
import { CreateAccountController } from './controllers/create-account'
import { CreateQuestionController } from './controllers/create-question'
import { DeleteAnswerController } from './controllers/delete-answer'
import { DeleteCommentOnAnswerController } from './controllers/delete-comment-on-answer'
import { DeleteCommentOnQuestionController } from './controllers/delete-comment-on-question'
import { DeleteQuestionController } from './controllers/delete-question'
import { EditAnswerController } from './controllers/edit-answer'
import { EditQuestionController } from './controllers/edit-question'
import { FetchQuestionAnswersController } from './controllers/fetch-question-answers'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug'
import { FetchCommentsOnAnswerController } from './controllers/fetch-comments-on-answer'
import { FetchCommentsOnQuestionController } from './controllers/fetch-comments-on-question'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AnswerQuestionController,
    AuthenticateController,
    ChooseQuestionBestAnswerController,
    CommentOnAnswerController,
    CommentOnQuestionController,
    CreateAccountController,
    CreateQuestionController,
    DeleteAnswerController,
    DeleteCommentOnAnswerController,
    DeleteCommentOnQuestionController,
    DeleteQuestionController,
    EditAnswerController,
    EditQuestionController,
    FetchCommentsOnAnswerController,
    FetchCommentsOnQuestionController,
    FetchQuestionAnswersController,
    FetchRecentQuestionsController,
    GetQuestionBySlugController,
    // RegisterStudentController,
  ],
  providers: [
    AnswerQuestionUseCase,
    AuthenticateStudentUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnAnswerUseCase,
    CommentOnQuestionUseCase,
    CreateQuestionUseCase,
    DeleteAnswerUseCase,
    DeleteCommentOnAnswerUseCase,
    DeleteCommentOnQuestionUseCase,
    DeleteQuestionUseCase,
    EditAnswerUseCase,
    EditQuestionUseCase,
    FetchCommentsOnAnswerUseCase,
    FetchCommentsOnQuestionUseCase,
    FetchQuestionAnswersUseCase,
    FetchRecentQuestionsUseCase,
    GetQuestionBySlugUseCase,
    RegisterStudentUseCase,
  ],
})
export class HttpModule {}
