import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const adminDb = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'mysql'
  }
});

async function createDatabase(dbName) {
  const exists = await adminDb.raw(`SHOW DATABASES LIKE ?`, [dbName]);
  if (exists[0].length === 0) {
    await adminDb.raw(`CREATE DATABASE ??`, [dbName]);
    console.log(`Database ${dbName} created`);
  } else {
    console.log(`Database ${dbName} already exists`);
  }
  await adminDb.destroy();
}

createDatabase(process.env.DB_NAME).catch(console.error);
