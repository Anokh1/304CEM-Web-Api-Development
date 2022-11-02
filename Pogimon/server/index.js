const express = require('express');
const app = express(); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 
const User = require('./models/user.model'); // login and register 
const MONSTER = require('./models/favouriteMonster')
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs'); 

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://Adrian:1234@cluster0.5opqxgk.mongodb.net/PokeApi?retryWrites=true&w=majority ')

// Used by PokemonThumbnail.js and DigimonThumbnail.js Favourite button
app.post('/api/favouriteMONSTER', async (req, res) => {
    console.log(req.body)
    try {
        const monster = await MONSTER.create({
            userFrom: req.body.getEmail, // change here
            monsterId: req.body.id,
            monsterName: req.body.name,
            monsterImage: req.body.image,
            monsterType: req.body.type
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Failed to favorite' })
    }
})

// Used by MonsterThumbnail.js remove button
app.post('/api/removeMonster', async (req, res) => {
    console.log(req.body)
    try {
        const monster = await MONSTER.deleteOne({
            userFrom: req.body.getEmail, // change here
            monsterId: req.body.id,
            monsterName: req.body.name,
            monsterImage: req.body.image,
            monsterType: req.body.type
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Failed to remove' })
    }
})

// USER REGRISTRATION 
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

// USER LOGIN
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

// LOAD FAVOURITE MONSTERS BASED ON USER EMAIL ADDRESS 
app.get('/api/monster', async (req, res) => {
    const userEmail = req.headers['x-email']

    MONSTER.find({ 'userFrom': userEmail })
        .exec((err, monster) => {
            if(err) return res.json({ status: 'error', error: 'Failed to load monster(s)'});
            return res.json({ status: 'ok', monster })
        })    
})

// ***DASHBOARD***
// DASHBOARD TO TEST THE JWT TOKEN
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
// END OF DASHBOARD TO TEST THE JWT TOKEN 

app.listen(1337, () => {
    console.log('Server started on 1337'); 
})

