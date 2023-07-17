import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { InterviewAnswer } from './interview-answer/interview-answer.entity'

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

    @Column()
    position: string

    @OneToMany(() => InterviewAnswer, answer => answer.applicant)
    answer: InterviewAnswer[];
}