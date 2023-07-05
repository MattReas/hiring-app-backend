import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicantProfile } from './applicant-profiles.entity';

@Injectable()
export class ApplicantProfilesService {
  constructor(
    @InjectRepository(ApplicantProfile)
    private applicantProfilesRepository: Repository<ApplicantProfile>,
  ) {}

  createProfile(profileData: ApplicantProfile): Promise<ApplicantProfile> {
    const newProfile = this.applicantProfilesRepository.create(profileData)
    return this.applicantProfilesRepository.save(newProfile)
  }

  getProfiles() {
    return this.applicantProfilesRepository.find()
  }
}
