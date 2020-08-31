const { router } = require('./routes');
const pokemonService = require('../service/pokemonService');

module.exports = {

    async index(req, res, next) {
        const response = await pokemonService.getPokemon();
        console.log(response);
        res.send(`Pokemon encontrato!!! ${response.data.name}!!!! ${response.data.sprites.front_default}`);
    }

}