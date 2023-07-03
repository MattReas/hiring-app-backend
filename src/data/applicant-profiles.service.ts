import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicantProfilesService {
  private profiles = [];

  createProfile(profileData) {
    const newProfile = { id: Date.now(), ...profileData };
    this.profiles.push(newProfile);
    return newProfile;
  }

  getProfiles() {
    return this.profiles;
  }
}
