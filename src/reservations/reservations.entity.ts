import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from '../rooms/rooms.entity';
import { User } from '../users/users.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  clientId: string;

  @Column()
  roomId: string;

  @Column({ type: 'timestamp' })
  startDateTime: Date;

  @Column({ type: 'timestamp' })
  endDateTime: Date;

  @ManyToOne(() => User, (user) => user.reservations)
  public user: User;

  @ManyToOne(() => Room, (room) => room.reservations)
  room: Room;
}
