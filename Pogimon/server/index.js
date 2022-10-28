const express = require('express');
const app = express(); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 
const User = require('./models/user.model'); 
const Pokemon = require('./models/favoritePokemon'); 
const Digimon = require('./models/favoriteDigimon')
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 

app.use(cors())
app.use(express.json())
app.use('/api/favorite', require('./favoritePoke'));


//mongoose.connect('mongodb://localhost:27017')

mongoose.connect('mongodb+srv://Adrian:1234@cluster0.5opqxgk.mongodb.net/PokeApi?retryWrites=true&w=majority ')

// Used by PokemonThumbnail.js Favorite button
app.post('/api/favoritePokemon', async (req, res) => {
    console.log(req.body)
    try {
        const pokemon = await Pokemon.create({
            userFrom: req.body.getEmail, // change here
            pokemonId: req.body.id,
            pokemonName: req.body.name,
            pokemonImage: req.body.image,
            pokemonType: req.body.type
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Failed to favorite' })
    }
})

// Used by DigimonThumbnail.js Favorite button
app.post('/api/favoriteDigimon', async (req, res) => {
    console.log(req.body)
    try {
        const digimon = await Digimon.create({
            userFrom: req.body.getEmail, // change here
            digimonId: req.body.id,
            digimonName: req.body.name,
            digimonImage: req.body.image,
            digimonType: req.body.type
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Failed to favorite' })
    }
})

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10) // 10 cycles
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            //password: req.body.password
            password: newPassword // store hashed password 
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Email already exist' })
    }
})

// app.post('/api/getMonsters', async (req, res) => {
//     const monster = await Pokemon.findMany({
//         userFrom: req.body.x
//     })

//     return res.json({pokemonId, pokemonName, pokemonImage, pokemonType}); 
// })

// app.get('/api/getMonster', cors(), (req, res) => {
//     const monsters = Pokemon.find({
//         email: req.body.x
//     })

//     res.json(monsters); 
// })

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
        //password: req.body.password
    })

    if(!user) { return { status: 'error', error: 'Invalid login' } }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if (isPasswordValid){

        const token = jwt.sign(
            {
                name: user.name,
                email: user.email
            },
            'secret123'
        )

        return res.json({ status: 'ok', user: token })
    } else {
        res.json({ status: 'error', user: false })
    }
})

app.get('/api/monster', async (req, res) => {
    const userEmail = req.headers['x-email']

    Pokemon.find({ 'userFrom': userEmail })
        .exec((err, monster) => {
            if(err) return res.json({ status: 'error', error: 'Failed to load monster(s)'});
            return res.json({ status: 'ok', monster })
        })

    // try{
    //     const mon = await Pokemon.findOne({ userFrom: userEmail })

    //     return res.json({ 
    //         status: 'ok',
    //         id: mon.pokemonId,
    //         name: mon.pokemonName,
    //         image: mon.pokemonImage,
    //         type: mon.pokemonType 
    //     })
    // } catch (error){
    //     console.log(error)
    //     res.json({ status: 'error', error: 'Failed to load monster(s)'})
    // }    
})



app.get('/api/quote', async (req, res) => {

    const token = req.headers['x-access-token']

    try{
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({ email: email })

        return res.json({ status: 'ok', quote: user.quote }) 
    } catch (error){
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    } 
    

    // const user = await User.findOne({
    //     email: req.body.email,
    //     password: req.body.password
    // })

    // if (user){

    //     const token = jwt.sign(
    //         {
    //             name: user.name,
    //             email: user.email
    //         },
    //         'secret123'
    //     )

    //     return res.json({ status: 'ok', user: token })
    // } else {
    //     res.json({ status: 'error', user: false })
    // }
})

app.post('/api/quote', async (req, res) => {

    const token = req.headers['x-access-token']

    try{
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        await User.updateOne({ email: email }, { $set: { quote: req.body.quote }})

        return res.json({ status: 'ok' })
    } catch (error){
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    } 
})


app.listen(1337, () => {
    console.log('Server started on 1337'); 
})

