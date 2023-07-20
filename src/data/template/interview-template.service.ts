import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterviewTemplate } from './interview-template.entity';

@Injectable()
export class InterviewTemplateService {
    constructor(
        @InjectRepository(InterviewTemplate)
        private interviewTemplateRepository: Repository<InterviewTemplate>,
    ) {}

    findAll(): Promise<InterviewTemplate[]> {
        return this.interviewTemplateRepository.find()
    }

    async findOne(id: number): Promise<InterviewTemplate> {
        try {
            const template = await this.interviewTemplateRepository.findOneByOrFail({ id: id })
            return template
        } catch (error) {
            throw new NotFoundException('Interview template with ID ${id} not found')
        }
    }
    create(template: Partial<InterviewTemplate>): Promise<InterviewTemplate> {
        const newTemplate = this.interviewTemplateRepository.create(template)
        return this.interviewTemplateRepository.save(newTemplate)
    }

    async update(id: number, template: Partial<InterviewTemplate>): Promise<InterviewTemplate> {
        await this.findOne(id) // will throw an error if the template doesn't exist
        await this.interviewTemplateRepository.update(id, template)
        return this.interviewTemplateRepository.findOneByOrFail({ id:id })
    }

    async delete(id: number): Promise<void> {
        const result = await this.interviewTemplateRepository.delete(id)
        if (result.affected === 0) {
            throw new NotFoundException('Interview template with ID ${id} not found')
        }
    }
}