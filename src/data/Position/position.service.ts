import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, In } from 'typeorm';
import { Position } from '../position/position.entity';
import { ApplicantProfile } from '../applicant-profiles.entity';
import { InterviewTemplate } from '../template/interview-template.entity';


@Injectable()
export class PositionService {
    constructor(
        @InjectRepository(Position)
        private readonly positionRepository: Repository<Position>,
        @InjectRepository(ApplicantProfile)
        private readonly applicantRepository: Repository<ApplicantProfile>,
        @InjectRepository(InterviewTemplate)
        private readonly templateRepository: Repository<InterviewTemplate>
    ) {}
    
    findAll(): Promise<Position[]> {
        return this.positionRepository.find()
    }

    async findOne(id: number): Promise<Position> {
        try {
            const position = await this.positionRepository.findOneByOrFail({ id: id })
            return position
        } catch (error) {
            throw new NotFoundException(`Position with ID ${id} not found`)
        }
    }

    async create(data: Partial<Position>): Promise<Position> {
        const position = this.positionRepository.create({
            ...data,
            templates: []
        })
        return this.positionRepository.save(position)
    }

    async updateName(id: number, data: Partial<Position>): Promise<Position> {
        const position = await this.findOne(id)
        
        if (data.positionTitle) {
            (await position).positionTitle = data.positionTitle
            await this.positionRepository.save(position)
        }
        return position
    }

    async remove(id: number): Promise<void> {
        const result = await this.positionRepository.delete(id)
        if (result.affected === 0) {
            throw new NotFoundException('Position not found')
        }
    }

    async assignTemplate(positionId: number, templateId: number): Promise<Position> {
        const position = await this.positionRepository.findOne({where: { id: positionId },  relations: ['applicants']})
        const template = await this.templateRepository.findOne({where: {id: templateId}, relations: ['positions']});

        if (!position || !template){
            throw new NotFoundException('Position or template not found')
        }

        position.templates.push(template)
        
        await this.positionRepository.save(position)

        return position
    }

    async unassignTemplate(positionId: number, templateId: number): Promise<Position> {
        const position = await this.positionRepository.findOne({where: { id: positionId },  relations: ['applicants']})
        const template = await this.templateRepository.findOne({where: {id: templateId}, relations: ['positions']});
        
        if (!position || !template) {
            throw new NotFoundException('Position or Template not found')
        }
        
        position.templates = position.templates.filter(template => template.id !== +templateId)
        
        await this.positionRepository.save(position)
        
        return position
    }

    async assignTemplatesByTitles(positionTitles: string[], templateId: number): Promise<Position[]> {
        console.log(positionTitles)
        const positions = await this.positionRepository.find({ where: { positionTitle: In(positionTitles) }, relations: ['applicants']})
        const template = await this.templateRepository.findOne({where: { id: templateId }, relations: ['positions']})

        if (positions.length === 0 || !template) {
            throw new NotFoundException('Position(s) or template not found')
        }

        for (let position of positions) {
            position.templates.push(template)
            
        }

        await this.positionRepository.save(positions)
        await this.templateRepository.save(template)

        return positions
    
    }
}