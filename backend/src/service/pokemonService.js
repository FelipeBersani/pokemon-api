const axios = require('axios');

module.exports = {
    async getPokemon(req, res){
        try{
            return await axios.get('https://pokeapi.co/api/v2/pokemon/900');
        }catch(err){
            console.log('dei erro'+err);
            return response = {
                data: {
                    name: 'tem não',
                    sprites: {
                        front_default: "sei não"
                    }
                },

            }
        }
    }
}