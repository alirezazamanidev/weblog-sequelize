import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { config } from 'dotenv';

config();

export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadModels: true,
  synchronize: true,
  logging: process.env.NODE_ENV !== 'production',
}; 