const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const router = express.Router();

const PokemonController = require('../controller/PokemonController');

router.get('/', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        //attribute: Joi.requires().crazyValidation()
    })
}), PokemonController.index);

module.exports = router;