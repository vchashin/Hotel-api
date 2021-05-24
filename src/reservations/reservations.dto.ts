import { PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty()
  @IsDefined()
  @IsUUID()
  clientId: string;

  @ApiProperty()
  @IsDefined()
  @IsUUID()
  roomId: string;

  @ApiProperty()
  @IsDefined()
  startDateTime: Date;

  @ApiProperty()
  @IsDefined()
  endDateTime: Date;
}

export class UpdateReservationDto extends PartialType(CreateReservationDto) {}
