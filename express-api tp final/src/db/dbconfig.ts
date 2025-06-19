import { config } from 'mssql';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const dbConfig: config = {
  server: process.env.DB_SERVER || 'localhost',
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USER ,
      password: process.env.DB_PASSWORD ,
    }
  },
  options: {
    database: process.env.DB_NAME ,
    encrypt: false,
    trustServerCertificate: true,
    port: Number(process.env.DB_PORT) ,
  }
};

export default dbConfig;
