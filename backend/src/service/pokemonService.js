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

  async getAllPokemons(startId = 0) {
    let pokemons = {};
    if(startId===10157){
    }else if(startId>1000){
      pokemons = await axios.get(pokeApiUrl.SEARCH_POKEMONS_PAGINATED_AFTER_HUNDRED);
    }else{
      pokemons = await axios.get(pokeApiUrl.SEARCH_POKEMONS_PAGINATED+startId);
    }
    if (pokemons.length < 1) return null;

    const responseArray = await this.findPokemons(pokemons.data.results);
    return responseArray;
  },

  async findPokemons(urls, responseArray=[]){
    let pokemon = {};

    await axios.all(urls.map(u => axios.get(u.url)))
    .then(axios.spread((...responses) => {
      responses.forEach(async res => {
        pokemon = await mapper.pokemonCard(res.data);
        responseArray.push(pokemon);
      });
    })).catch(errors => {
      console.log(errors)
    })
    responseArray = {
      pokemons: responseArray,
      lastKey: responseArray[responseArray.length-1].id
    }
      
    console.log(`${responseArray.pokemons.length} pokemons found successfully`);
    return responseArray;
  }
}