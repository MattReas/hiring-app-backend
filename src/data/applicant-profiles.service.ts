import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicantProfile } from './applicant-profiles.entity';
import { PositionService } from './Position/position.service';

@Injectable()
export class ApplicantProfilesService {
  constructor(
    @InjectRepository(ApplicantProfile)
    private applicantProfilesRepository: Repository<ApplicantProfile>,
    private readonly positionService: PositionService
  ) {}

  async createProfile(profileData: ApplicantProfile): Promise<ApplicantProfile> {
    const newProfile = this.applicantProfilesRepository.create(profileData)
    const savedProfile = await this.applicantProfilesRepository.save(newProfile)

    const positions = await this.positionService.findAll()
    const targetPosition = positions.find(position => position.positionTitle === profileData.position)

    if (targetPosition) {
      await this.positionService.addApplicant(targetPosition.id, savedProfile.id)
    } else {
      console.warn(`Position with title ${profileData.position} was not found.`)
    }

    return savedProfile
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
