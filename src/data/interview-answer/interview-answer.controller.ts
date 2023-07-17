import { Controller, Get, Param, Post, Body, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { InterviewAnswerService } from './interview-answer.service';
import { InterviewAnswer } from './interview-answer.entity';

@Controller('interview-answer')
export class InterviewAnswerController {
    constructor(private readonly interviewAnswerService: InterviewAnswerService) {}

    @Get()
    findAll(): Promise<InterviewAnswer[]>{
        return this.interviewAnswerService.findAll();
    }
}