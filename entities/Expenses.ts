import {BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import { Users } from './Users';

@Entity()
export class Expenses extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'numeric'
    })
    amount: number

    @Column()
    category: string

    @ManyToOne(
        () => Users,
        user => user.expenses,
        { onDelete: 'CASCADE'}
    )
    @JoinColumn({
        name: 'user_id'
    })
    user: Users

    @Column() // There to remove nested relations
    user_id: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}