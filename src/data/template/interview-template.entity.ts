import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { InterviewQuestion } from '../Interview-question/interview-question.entity'

@Entity('interviewTemplate') 
export class InterviewTemplate {
    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => InterviewQuestion, question => question.template)
    questions: InterviewQuestion[]
}