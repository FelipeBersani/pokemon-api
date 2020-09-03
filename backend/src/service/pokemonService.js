const axios = require('axios');
const url = require('../utils/pokeApiUrl');
const pokeApiUrl = require('../utils/pokeApiUrl');
const mapper = require('../model/mapper/PokemonMapper');

module.exports = {
  async getPokemonById(id) {
    try {
      const pokemon = await axios.get(url.SEARCH_POKEMON_BY_ID + id);
      const returningPokemon = await mapper.fullPokemon(pokemon.data);
      console.log(`${returningPokemon.name} was found successfully!`);
      return returningPokemon;
    } catch (err) {
      console.log(`Error to find pokemon with id: ${id}`);
      return null;
    }
  },

  async getAllPokemons(offset) {
    const pokemons = await axios.get(pokeApiUrl.SEARCH_POKEMONS_PAGINATED+offset);
    if (pokemons.length < 1) return null;

    const responseArray = this.findPokemons(pokemons.data.results);
    
    return responseArray;
  },

  async findPokemons(urls, responseArray=[]){
    await axios.all(urls.map(u => axios.get(u.url)))
    .then(axios.spread((...responses) => {
      responses.forEach(async res => {
        const pokemon = await mapper.pokemonCard(res.data);
        responseArray.push(pokemon);
      });
    })).catch(errors => {
      console.log(errors)
    })
    console.log(`${responseArray.length} pokemons found successfully`);
    return responseArray;
  }
}