import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const jwtConstants = {
  secret: 'secretKey',
};

export const TYPEORM_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: 'platform',
  password: 'platform',
  database: 'platform',
  synchronize: true,
  migrationsRun: true,
  logging: true,
  migrations: ['dist/migration/*{.ts,.js}'],
  entities: ['dist/**/*.entity{.ts,.js}'],
};

export enum RoleType {
  CLIENT = 'client',
  ADMIN = 'admin',
}
