import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterviewQuestion } from './interview-question.entity';

@Injectable()
export class InterviewQuestionService {
  constructor(
    @InjectRepository(InterviewQuestion)
    private InterviewQuestionRepository: Repository<InterviewQuestion>,
  ) {}

  findAll(): Promise<InterviewQuestion[]> {
    return this.InterviewQuestionRepository.find();
  }

  async findOne(id: number): Promise<InterviewQuestion> {
    try {
      const question = await this.InterviewQuestionRepository.findOneByOrFail({
        id: id,
      });
      return question;
    } catch (error) {
      throw new NotFoundException('Interview question with ID ${id} not found');
    }
  }

  create(question: Partial<InterviewQuestion>): Promise<InterviewQuestion> {
    const newQuestion = this.InterviewQuestionRepository.create(question);
    return this.InterviewQuestionRepository.save(newQuestion);
  }

  async update(
    id: number,
    answer: Partial<InterviewQuestion>,
  ): Promise<InterviewQuestion> {
    await this.findOne(id); // will throw an error if the answer doesn't exist
    await this.InterviewQuestionRepository.update(id, answer);
    return this.InterviewQuestionRepository.findOneByOrFail({ id: id });
  }

  async delete(id:number): Promise<void> {
    const result = await this.InterviewQuestionRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException('interview answer with ID ${id} not found')
    }
  }
}
