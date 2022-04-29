import dotenv from 'dotenv';
dotenv.config();

export const configsql = {
    client: "mysql2",
    connection: {
      host: process.env.HOSTDB,
      user: process.env.USERDB,
      password: process.env.PASSWORDDB,
      database: process.env.DATABASEDB,
    },
  };
export const configlite = {
    client: 'better-sqlite3',
    connection: {
      filename: './db/messages.sqlite',
    },
    useNullAsDefault: true,
  };
  