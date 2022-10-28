const mongoose = require('mongoose');

const Pokemon = new mongoose.Schema(
    {
    //userFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    //userFrom: { type: mongoose.Schema.Types.String, ref: 'User' },
    userFrom: { type: String },
    pokemonId: { type: String },
    pokemonName: { type: String },
    pokemonImage: { type: String },
    pokemonType: { type: String },
    },
    { collection: 'favorite-pokemon' }
)

const favoritePoke = mongoose.model('FavoritePokemon', Pokemon);

module.exports = favoritePoke; 


