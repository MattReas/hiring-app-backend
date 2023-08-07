import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { InterviewTemplate } from '../template/interview-template.entity'
import { ApplicantProfile } from '../applicant-profiles.entity'

@Entity('position')
export class Position {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    positionTitle: string
    
    @ManyToMany(() => ApplicantProfile, applicant => applicant.position, { eager: true, cascade: false })
    applicants: ApplicantProfile[]

    @ManyToMany(() => InterviewTemplate, template => template.position, { eager: true, cascade: false })
    @JoinTable()
    templates: InterviewTemplate[]
}