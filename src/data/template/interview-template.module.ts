import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewTemplateController } from './interview-template.controller';
import { InterviewTemplateService } from './interview-template.service';
import { InterviewTemplate } from './interview-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterviewTemplate])],
  controllers: [InterviewTemplateController],
  providers: [InterviewTemplateService],
  exports: [InterviewTemplateService], // if you want to use it in another module
})
export class InterviewTemplateModule {}