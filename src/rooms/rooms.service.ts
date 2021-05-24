import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Room } from './rooms.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomsRepository: Repository<Room>,
  ) {}
  async create(entity: DeepPartial<Room>) {
    return await this.roomsRepository.save(entity);
  }

  async findAll(startSearchDate: Date, endSearchDate: Date) {
    const startDate = new Date(startSearchDate).toISOString();
    const endDate = new Date(endSearchDate).toISOString();
    return await this.roomsRepository
      .createQueryBuilder('r')
      .leftJoinAndSelect('reservation', 'rs', `rs."roomId" = r."id"`)
      .where(
        `(rs."startDateTime" isnull and rs."endDateTime" isnull)
                or rs."startDateTime" > '${endDate}'
                or rs."endDateTime" < '${startDate}'`,
      )
      .getMany();
  }

  async findOne(id, options?) {
    return await this.roomsRepository.findOne(id, options);
  }

  async update(id: string, entity: DeepPartial<Room>) {
    await this.roomsRepository.update(id, entity);

    return await this.roomsRepository.findOne(id);
  }

  async delete(id: string) {
    await this.roomsRepository.delete({ id });

    return { id };
  }
}
