async function loadCharacterData() {
    try {
      const { default: fetch } = await import('node-fetch');
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error loading character data:", error);
      throw error;
    }
  }
  
  module.exports = {
    loadCharacterData,
  };
  