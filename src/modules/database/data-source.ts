import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/modules/database/migration/*.ts'],
  migrationsTableName: 'migrations',
});
