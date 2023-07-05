import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

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
}