import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantProfilesController } from './applicant-profiles.controller';
import { ApplicantProfilesService } from './applicant-profiles.service';
import { ApplicantProfile } from './applicant-profiles.entity';
import { PositionModule } from './Position/position.module';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicantProfile]),
  PositionModule
  ],
  controllers: [ApplicantProfilesController],
  providers: [ApplicantProfilesService],
})
export class ApplicantProfilesModule {}
