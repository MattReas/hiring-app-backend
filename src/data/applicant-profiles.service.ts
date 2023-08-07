import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOne(id: number): Promise<ApplicantProfile> {
    try {
      const applicant = await this.applicantProfilesRepository.findOneByOrFail({ id: id })
      return applicant
    } catch (error) {
      throw new NotFoundException(`Applicant profile with ID ${id} not found`)
    }
  }
}
