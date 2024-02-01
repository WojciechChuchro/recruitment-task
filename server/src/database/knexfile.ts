import dotenv from 'dotenv';
import path from 'path';
import { KnexConfig } from '../types/config';

const envFilePath = path.join(__dirname, '../../.env');
dotenv.config({ path: envFilePath });

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "database",
  port: 3306,
};

const knexfile: KnexConfig = {
  development: {
    client: 'mysql2',
    connection: dbConfig,
    migrations: {
      tableName: 'migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};

export default knexfile;
