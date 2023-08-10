import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Position } from './position.entity'
import { ApplicantProfile } from '../applicant-profiles.entity';
import { InterviewTemplate } from '../template/interview-template.entity';

import { PositionService } from './position.service';
import { PositionController } from './position.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Position,
            ApplicantProfile,
            InterviewTemplate
        ])
    ],
    providers: [PositionService],
    controllers: [PositionController],
    exports: [PositionService]
})

export class PositionModule {}