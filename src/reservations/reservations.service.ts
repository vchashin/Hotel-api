import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservations.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly cardsRepository: Repository<Reservation>,
  ) {}

  async create(entity: Partial<Reservation>) {
    return await this.cardsRepository.save(entity);
  }

  async findAll() {
    return await this.cardsRepository.find();
  }

  findOne(id) {
    return this.cardsRepository.findOne(id);
  }

  async update(id: string, entity: Partial<Reservation>) {
    await this.cardsRepository.update(id, entity);

    return await this.cardsRepository.findOne(id);
  }

  async delete(id: string) {
    await this.cardsRepository.delete({ id });

    return { id };
  }
}
