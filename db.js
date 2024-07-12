const pg = require("pg");
const fs = require("fs");

const config = {
  connectionString:
    "postgres://candidate:62I8anq3cFq5GYh2u4Lh@rc1b-r21uoagjy1t7k77h.mdb.yandexcloud.net:6432/db1",
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("root.crt").toString(),
  },
};

const conn = new pg.Client(config);

async function createTable() {
  try {
    await conn.connect();
    await conn.query(`
      CREATE TABLE IF NOT EXISTS jumperbreaker (
        id SERIAL PRIMARY KEY,
        name TEXT,
        data JSONB
      )
    `);
  } catch (error) {
    console.error("Error creating table:", error);
    throw error;
  }
}

async function insertData(data) {
  try {
    for (const character of data) {
      await conn.query(
        "INSERT INTO jumperbreaker (name, data) VALUES ($1, $2)",
        [character.name, JSON.stringify(character)]
      );
    }
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
}

async function closeConnection() {
  try {
    await conn.end();
  } catch (error) {
    console.error("Error closing connection:", error);
    throw error;
  }
}

module.exports = {
  createTable,
  insertData,
  closeConnection,
};
