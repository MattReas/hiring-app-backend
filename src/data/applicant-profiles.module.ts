import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantProfilesController } from './applicant-profiles.controller';
import { ApplicantProfilesService } from './applicant-profiles.service';
import { ApplicantProfile } from './applicant-profiles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicantProfile])],
  controllers: [ApplicantProfilesController],
  providers: [ApplicantProfilesService],
})
export class ApplicantProfilesModule {}
