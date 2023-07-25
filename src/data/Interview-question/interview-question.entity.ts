import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { InterviewAnswer } from '../interview-answer/interview-answer.entity'
import { InterviewTemplate } from '../template/interview-template.entity'

@Entity('interviewQuestion')
export class InterviewQuestion {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    question: string

    @ManyToOne(() => InterviewTemplate, template => template.questions)
    template: InterviewTemplate

    @OneToMany(() => InterviewAnswer, answer => answer.question)
    answers: InterviewAnswer[]

}