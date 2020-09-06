const pokemonService = require('../service/pokemonService');

module.exports = {
    async favcon(req, res) {return res.status(204);},

    async getAll(req, res) {
        const startId = req.query.startId;
        const response = await pokemonService.getAllPokemons(startId);
        return res.json(response);
    },

    async getById(req, res) {
        const id = req.params.id;
        const response = await pokemonService.getPokemonById(id);
        return res.json(response);
    }
    
}