const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const router = express.Router();

const PokemonController = require('./controller/PokemonController');

router.get('/favicon.ico', PokemonController.favcon); 

router.get('/', PokemonController.getAll);

router.get('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required().min(1).max(892).message('Pokemons only available between 1 to 892')
    })
}), PokemonController.getById);

module.exports = router;