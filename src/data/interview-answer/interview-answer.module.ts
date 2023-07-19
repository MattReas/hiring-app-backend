import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewAnswerService } from './interview-answer.service';
import { InterviewAnswerController } from './interview-answer.controller';
import { InterviewAnswer } from './interview-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterviewAnswer])],
  providers: [InterviewAnswerService],
  controllers: [InterviewAnswerController],
})
export class InterviewAnswerModule {}
