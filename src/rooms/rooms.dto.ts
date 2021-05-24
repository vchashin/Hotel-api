import { PartialType } from '@nestjs/mapped-types';
import { IsDefined, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty()
  @IsDefined()
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  number: number;
}

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
