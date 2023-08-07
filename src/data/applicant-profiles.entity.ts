import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { InterviewAnswer } from './interview-answer/interview-answer.entity'
import { Position } from './Position/position.entity'

@Entity('applicantProfiles')
export class ApplicantProfile {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    ePanther: string

    @Column()
    grad: string

    @ManyToMany(() => Position, position => position.applicants)
    @JoinTable()
    position: Position[]

    @OneToMany(() => InterviewAnswer, answer => answer.applicant)
    answer: InterviewAnswer[];
}