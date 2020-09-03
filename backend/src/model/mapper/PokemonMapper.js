module.exports = {
  async fullPokemon(pokemon) {
    return {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height * 10,
      weight: pokemon.weight / 10,
      stats: {
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        special_attack: pokemon.stats[3].base_stat,
        special_defense: pokemon.stats[4].base_stat,
        speed: pokemon.stats[5].base_stat,
      },
      moves: pokemon.moves.map(move => move.move.name),
      types: pokemon.types.map(type => type.type.name).join('/'),
      sprite: pokemon.sprites.front_default,
    }
  },

  async pokemonCard(pokemon) {
    return {
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map(type => type.type.name).join('/'),
      sprite: pokemon.sprites.front_default,
    }
  }

}