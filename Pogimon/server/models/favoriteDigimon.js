const mongoose = require('mongoose');

const Digimon = new mongoose.Schema(
    {
    //userFrom: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userFrom: { type: String },
    digimonId: { type: String },
    digimonName: { type: String },
    digimonImage: { type: String },
    digimonType: { type: String },
    },
    { collection: 'favorite-digimon' }
)

const favoriteDigi = mongoose.model('FavoriteDigimon', Digimon);

module.exports = favoriteDigi; 


