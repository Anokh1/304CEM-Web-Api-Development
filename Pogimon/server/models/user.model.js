const mongoose = require('mongoose'); 

const User = new mongoose.Schema(
    {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quote: { type: String }, // for Dashboard, jwt testing
    },
    { collection: 'user-data' } // Can see at MongoDB
)

const model = mongoose.model('UserData', User); 

module.exports = model; 