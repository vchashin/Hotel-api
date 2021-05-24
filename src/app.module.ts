import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { ReservationsModule } from './reservations/reservations.module';
import { TYPEORM_CONFIG } from './common/constants';
@Module({
  imports: [
    TypeOrmModule.forRoot(TYPEORM_CONFIG),
    UsersModule,
    AuthModule,
    RoomsModule,
    ReservationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
