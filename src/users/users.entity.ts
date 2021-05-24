import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Type } from 'class-transformer';
import { RoleType } from '../common/constants';
import { Room } from '../rooms/rooms.entity';
import { Reservation } from '../reservations/reservations.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @Column({ type: 'enum', enum: RoleType })
  role: RoleType;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @OneToMany(() => Room, (rooms) => rooms.user)
  @Type(() => Room)
  @JoinColumn()
  rooms?: Room[];

  @OneToMany(() => Reservation, (reservations) => reservations.user)
  @Type(() => Reservation)
  @JoinColumn()
  reservations?: Reservation[];
}
