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
import { InterviewAnswerService } from './interview-answer.service';
import { InterviewAnswer } from './interview-answer.entity';

@Controller('interview-answer')
export class InterviewAnswerController {
  constructor(
    private readonly interviewAnswerService: InterviewAnswerService,
  ) {}

  @Get()
  findAll(): Promise<InterviewAnswer[]> {
    return this.interviewAnswerService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<InterviewAnswer> {
    try {
      return await this.interviewAnswerService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  create(@Body() answer: Partial<InterviewAnswer>): Promise<InterviewAnswer> {
    return this.interviewAnswerService.create(answer);
  }
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() answer: Partial<InterviewAnswer>,
  ): Promise<InterviewAnswer> {
    try {
      return await this.interviewAnswerService.update(id, answer);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    try {
      return await this.interviewAnswerService.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
