
const url = 'https://pokeapi.co/api/v2/pokemon';

module.exports = {
  SEARCH_POKEMON_BY_ID: `${url}/`,
  SEARCH_POKEMONS_PAGINATED: `${url}?limit=10&offset=`,
  SEARCH_POKEMONS_PAGINATED_AFTER_HUNDRED: `${url}?limit=200&offset=892`,
}