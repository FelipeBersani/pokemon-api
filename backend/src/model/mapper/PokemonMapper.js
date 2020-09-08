module.exports = {
  async fullPokemon(pokemon) {
    console.log(pokemon.stats)
    return {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height * 10,
      weight: pokemon.weight / 10,
      stats: {
        hp: pokemon.stats[0] ? pokemon.stats[0].base_stat : 0,
        attack: pokemon.stats[1] ? pokemon.stats[1].base_stat : 0,
        defense: pokemon.stats[2] ? pokemon.stats[2].base_stat : 0,
        special_attack: pokemon.stats[3] ? pokemon.stats[3].base_stat : 0,
        special_defense: pokemon.stats[4] ? pokemon.stats[4].base_stat : 0,
        speed: pokemon.stats[5] ? pokemon.stats[5].base_stat : 0,
      },
      moves: pokemon.moves.map(move => move.move.name),
      types: pokemon.types.map(type => type.type.name),
      sprite: pokemon.sprites.front_default,
    }
  },

  async pokemonCard(pokemon) {
    return {
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map(type => type.type.name),
      sprite: pokemon.sprites.front_default,
    }
  }

}