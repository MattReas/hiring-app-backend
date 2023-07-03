import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApplicantProfilesService } from './applicant-profiles.service';

@Controller('applicantProfiles')
export class ApplicantProfilesController {
  constructor(private readonly applicantProfilesService: ApplicantProfilesService) {}

  @Post()
  createProfile(@Body() profileData: {
    firstName: string,
    lastName: string,
    ePanther: string,
    major: string;
    grad: string;
    position: string;
  }) {
    return this.applicantProfilesService.createProfile(profileData);
  }

  @Get()
  getProfiles() {
    return this.applicantProfilesService.getProfiles();
  }
}
