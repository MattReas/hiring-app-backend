import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { InterviewTemplate } from '../template/interview-template.entity'
import { ApplicantProfile } from '../applicant-profiles.entity'

@Entity('position')
export class Position {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    positionTitle: string

    @ManyToMany(() => InterviewTemplate, template => template.positions, { eager: true, cascade: false })
    @JoinTable()
    templates: InterviewTemplate[]
}