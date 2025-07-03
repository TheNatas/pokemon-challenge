import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const connection = new Pool({
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      ssl: {
        rejectUnauthorized: false, // <-- this accepts self-signed certs
      },
  });