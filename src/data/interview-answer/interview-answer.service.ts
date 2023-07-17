import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterviewAnswer } from './interview-answer.entity';

@Injectable()
export class InterviewAnswerService {
  constructor(
    @InjectRepository(InterviewAnswer)
    private interviewAnswerRepository: Repository<InterviewAnswer>,
  ) {}
  
  findAll(): Promise<InterviewAnswer[]> {
    return this.interviewAnswerRepository.find()
  }
  
  async findOne(id: number): Promise<InterviewAnswer> {
    try {
      const answer = await this.interviewAnswerRepository.findOneByOrFail({ id: id })
      return answer
    } catch (error) {
      throw new NotFoundException('Interview answer with ID ${id} not found')
    }
  }

  create(answer: Partial<InterviewAnswer>): Promise<InterviewAnswer> {
    const newAnswer = this.interviewAnswerRepository.create(answer)
    return this.interviewAnswerRepository.save(newAnswer)
  }

  async update(id: number, answer: Partial<InterviewAnswer>): Promise<InterviewAnswer> {
    await this.findOne(id) // will throw an error if the answer doesn't exist
    await this.interviewAnswerRepository.update(id,answer)
    return this.interviewAnswerRepository.findOneByOrFail({ id: id })
  }

  async delete(id:number): Promise<void> {
    const result = await this.interviewAnswerRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException('Interview answer with ID ${id} not found')
    }
  }
}
