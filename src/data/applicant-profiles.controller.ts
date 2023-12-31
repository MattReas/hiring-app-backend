import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApplicantProfilesService } from './applicant-profiles.service';
import { ApplicantProfile } from './applicant-profiles.entity';

@Controller('applicantProfiles')
export class ApplicantProfilesController {
  constructor(
    private readonly applicantProfilesService: ApplicantProfilesService,
  ) {}

  @Post()
  createProfile(@Body() profileData: ApplicantProfile) {
    return this.applicantProfilesService.createProfile(profileData);
  }

  @Get()
  getProfiles() {
    return this.applicantProfilesService.getProfiles();
  }
}
