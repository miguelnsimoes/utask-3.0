import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity('cards')
export class Card {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'varchar' })
    title!: string

    @Column({ type: 'text', nullable: true }) 
    description!: string

    @Column({ type: 'varchar', default: 'todo' })
    column!: string

    @ManyToOne(() => User, (user) => user.id)
    user!: User
}   