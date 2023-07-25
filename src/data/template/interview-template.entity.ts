import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { InterviewQuestion } from '../interview-question/interview-question.entity'

@Entity('interviewTemplate') 
export class InterviewTemplate {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    templateName: string

    @OneToMany(() => InterviewQuestion, question => question.template)
    questions: InterviewQuestion[]
}