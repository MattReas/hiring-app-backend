import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { InterviewQuestionService } from './interview-question.service';
  import { InterviewQuestion } from './interview-question.entity';

  @Controller('interview-question')
  export class InterviewQuestionController {
    constructor(
        private readonly interviewQuestionService: InterviewQuestionService,
    ) {}

    @Get()
    findAll(): Promise<InterviewQuestion[]> {
        return this.interviewQuestionService.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<InterviewQuestion> { 
        try {
            return await this.interviewQuestionService.findOne(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        }
    }
    @Post()
    create(@Body() answer: Partial<InterviewQuestion>): Promise<InterviewQuestion> {
        return this.interviewQuestionService.create(answer)
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() answer: Partial<InterviewQuestion>,
    ): Promise<InterviewQuestion> {
        try {
            return await this.interviewQuestionService.update(id, answer)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        try {
            return await this.interviewQuestionService.delete(id)
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND)
        }
    }
  }