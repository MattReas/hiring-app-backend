import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { InterviewQuestion } from '../interview-question/interview-question.entity'
import { ApplicantProfile } from '../applicant-profiles.entity'

@Entity('InterviewAnswer')
export class InterviewAnswer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    answer: string

    @ManyToOne(() => ApplicantProfile, applicant => applicant.answer)
    applicant: ApplicantProfile

    @ManyToOne(() => InterviewQuestion, question => question.answers)
    question: InterviewQuestion

}