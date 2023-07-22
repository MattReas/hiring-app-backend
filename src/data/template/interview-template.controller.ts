import { Controller, Get, Param, Post, Body, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { InterviewTemplateService } from './interview-template.service';
import { InterviewTemplate } from './interview-template.entity';

@Controller('interview-template')
export class InterviewTemplateController {
    constructor(private readonly interviewTemplateService: InterviewTemplateService) {}

    @Get()
    findAll(): Promise<InterviewTemplate[]> {
        return this.interviewTemplateService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id:number): Promise<InterviewTemplate> {
        try {
            return await this.interviewTemplateService.findOne(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        }
    }

    @Post()
    create(@Body() template: Partial<InterviewTemplate>): Promise<InterviewTemplate> {
        return this.interviewTemplateService.create(template)
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() template: Partial<InterviewTemplate>): Promise<InterviewTemplate> {
        try {
            return await this.interviewTemplateService.update(id, template)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        try {
            return await this.interviewTemplateService.delete(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        }
    }
}