import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicantProfilesModule } from './data/applicant-profiles.module';
import { InterviewAnswersModule } from './data/interview-answers/interview-answers.module';
import { InterviewTemplatesModule } from './data/interview-templates/interview-templates.module';
import { InterviewQuestionsModule } from './data/interview-questions/interview-questions.module';
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
    InterviewAnswersModule,
    InterviewTemplatesModule,
    InterviewQuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
