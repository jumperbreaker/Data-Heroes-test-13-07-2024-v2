const { createTable, insertData, closeConnection } = require("./db");
const { loadCharacterData } = require("./dataLoader");

async function main() {
  try {
    await createTable();
    const characterData = await loadCharacterData();
    await insertData(characterData);
    console.log("Characters saved to jumperbreaker table successfully!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await closeConnection();
  }
}

main();
