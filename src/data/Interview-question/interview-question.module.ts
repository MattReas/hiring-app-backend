import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewQuestionController } from './interview-question.controller';
import { InterviewQuestionService } from './interview-question.service';
import { InterviewQuestion } from './interview-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterviewQuestion])],
  controllers: [InterviewQuestionController],
  providers: [InterviewQuestionService],
  exports: [InterviewQuestionService], // if you want to use it in another module
})
export class InterviewQuestionModule {}
