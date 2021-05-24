import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { DeepPartial, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(entity: DeepPartial<User>) {
    const emailUsagesCount = await this.usersRepository.count({
      email: entity.email,
    });

    if (emailUsagesCount) {
      throw new BadRequestException('Email already in use');
    }

    const hashPassword = await bcrypt.hash(entity.password, 10);
    const saveUser = await this.usersRepository.save({
      ...entity,
      password: hashPassword,
    });

    try {
      return this.usersRepository.findOne(saveUser.id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(user) {
    return await this.usersRepository.findOne(user);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async update(user: User, entity: DeepPartial<User>) {
    await this.usersRepository.update({ id: user.id }, entity);

    return await this.usersRepository.findOne({ id: user.id });
  }

  async delete(id: string) {
    return await this.usersRepository.delete({ id });
  }
}
