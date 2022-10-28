const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 
const { favoritePokemon } = require("./models/favoritePokemon");

// const { auth } = require("../middleware/auth");

//=================================\\
//        Favorite Pokemon         \\
//=================================\\

mongoose.connect('mongodb+srv://Adrian:1234@cluster0.5opqxgk.mongodb.net/PokeApi?retryWrites=true&w=majority ')

router.post("/favoriteNumber", (req, res) => {
   
    //Find Favorite information inside FavoritePokemon Collection by Pokemon ID 

    favoritePokemon.find({"pokemonId":  req.body.pokemonId })
        .exec(( err, favorite ) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, favoriteNumber: favorite.length })
        })
});


router.post("/favorited", (req, res) => {
   
   // Find Favorite Information inside FavoritePokemon Collection by Pokemon Id , userFrom 
   favoritePokemon.find({"pokemonId":  req.body.pokemonId , "userFrom": req.body.userFrom })
    .exec(( err, favorite) => {
        if(err) return res.status(400).send(err)

        //How can we know if I already favorite this movie or not ? 
        let result = false;
        if(favorite.length !== 0) {
            result = true
        }

        res.status(200).json({ success: true, favorited: result});

    })

});

router.post("/addToFavorite", (req, res) => {
   
    // Save the information about the Pokemon in the favoritePokemon collection
    const favorite = new favoritePokemon(req.body)

    favorite.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
});

router.post("/removeFromFavorite", (req, res) => {
   
    // Remove the information about the Pokemon in the favoritePokemon collection
    favoritePokemon.findOneAndDelete({ pokemonId: req.body.pokemonId, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, doc })
    })
});


module.exports = router;