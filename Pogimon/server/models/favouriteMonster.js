const mongoose = require('mongoose');

const MONSTER = new mongoose.Schema(
    {
    userFrom: { type: String },
    monsterId: { type: String },
    monsterName: { type: String },
    monsterImage: { type: String },
    monsterType: { type: String },
    },
    { collection: 'favourite-monster' }
)

const favouriteMon = mongoose.model('FavouriteMonster', MONSTER);

module.exports = favouriteMon; 


