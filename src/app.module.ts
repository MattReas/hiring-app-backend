import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicantProfilesController } from './data/applicant-profiles.controller';
import { ApplicantProfilesModule } from './data/applicant-profiles.module';


@Module({
  imports: [ApplicantProfilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
