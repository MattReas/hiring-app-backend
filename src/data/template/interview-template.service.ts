import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterviewTemplate } from './interview-template.entity';
import { InterviewQuestion } from '../interview-question/interview-question.entity'
import { EntityManager } from 'typeorm';

@Injectable()
export class InterviewTemplateService {
    constructor(
        @InjectRepository(InterviewTemplate)
        private interviewTemplateRepository: Repository<InterviewTemplate>,
        @InjectRepository(InterviewQuestion)
        private interviewQuestionRepository: Repository<InterviewQuestion>,
        private manager: EntityManager
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

    async findTemplateQuestions(id: number): Promise<InterviewQuestion[]> {
        const template = (await this.interviewTemplateRepository.find({            
            where: { id },
            relations: ["questions"]
        }))[0];
    
        if (!template) throw new Error('Template not found');
        return template.questions;
    }
    create(template: Partial<InterviewTemplate>): Promise<InterviewTemplate> {
        return this.manager.transaction(async manager => {
            const newTemplate = this.interviewTemplateRepository.create(template);
            const savedTemplate = await manager.save(newTemplate);
            
            // save each question separately
            for (let question of template.questions) {
                question.template = savedTemplate; // set the relation
                const newQuestion = this.interviewQuestionRepository.create(question);
                await manager.save(newQuestion); 
            }
            
            return savedTemplate;
        })

        // const newTemplate = this.interviewTemplateRepository.create(template)
        // return this.interviewTemplateRepository.save(newTemplate)
    }

    async update(id: number, templateData: Partial<InterviewTemplate>): Promise<InterviewTemplate> {
        // Fetch the existing template with its questions
        const template = await this.interviewTemplateRepository.findOne({where: { id: id },  relations: ['questions'] }); 
    
        if (!template) throw new NotFoundException(`Interview template with ID ${id} not found`);
    
        // Update template's simple fields
        if (templateData.templateName) {
            template.templateName = templateData.templateName;
        }
    
        // For the purpose of comparison and deletion
        const updatedQuestionIds = templateData.questions.map(q => q.id);
    
        // Remove questions not present in the update data
        template.questions = template.questions.filter(question => updatedQuestionIds.includes(question.id));
    
        // Update or add questions
        for (let questionData of templateData.questions) {
            let question = template.questions.find(q => q.id === questionData.id);
            if (question) {
                // Update existing question
                question.question = questionData.question;
            } else {
                // Add new question
                const newQuestion = new InterviewQuestion();
                newQuestion.question = questionData.question;
                newQuestion.template = template; // Set relation
                template.questions.push(newQuestion);
            }
        }
    
        // Save the template, cascading the changes to its questions
        return await this.interviewTemplateRepository.save(template);
    }
    

    async delete(id: number): Promise<void> {
        const result = await this.interviewTemplateRepository.delete(id)
        if (result.affected === 0) {
            throw new NotFoundException('Interview template with ID ${id} not found')
        }
    }
}