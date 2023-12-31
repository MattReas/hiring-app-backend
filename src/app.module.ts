import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicantProfilesModule } from './data/applicant-profiles.module';
import { InterviewAnswerModule } from './data/interview-answer/interview-answer.module';
import { InterviewTemplateModule } from './data/template/interview-template.module';
import { InterviewQuestionModule } from './data/interview-question/interview-question.module';
import { PositionModule } from './data/Position/position.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ApplicantProfilesModule,
    InterviewAnswerModule,
    InterviewTemplateModule,
    InterviewQuestionModule,
    PositionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
