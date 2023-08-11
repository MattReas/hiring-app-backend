import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm'
import { InterviewQuestion } from '../interview-question/interview-question.entity'
import { Position } from '../Position/position.entity'

@Entity('interviewTemplate')
export class InterviewTemplate {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    templateName: string

    @OneToMany(() => InterviewQuestion, question => question.template)
    questions: InterviewQuestion[]

    @ManyToMany(() => Position, position => position.templates)
    positions: Position[]
}