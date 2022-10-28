// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// export default function PokemonFavorite(props) {

//     const [FavoriteNumber, setFavoriteNumber] = useState(0)
//     const [Favorited, setFavorited] = useState(false)

//     const variable = {
//         userFrom: props.userFrom,
//         pokemonId: props.pokemonId,
//         pokemonName: props.pokemonName,
//         pokemonImage: props.pokemonImage,
//         pokemonType: props.pokemonType
//     }

//     useEffect(() => {
        
//         // *ADDED 'http://localhost:1337/
//         axios.post('/api/favorite/favoriteNumber', variable)
//             .then(response => {
//                 if(response.data.success){
//                     console.log(response.data.favoriteNumber)
//                     setFavoriteNumber(response.data.favoriteNumber)
//                 } else{
//                     alert('Failed to get favoriteNumber')
//                 }
//             })


//         // *ADDED 'http://localhost:1337/    
//         axios.post('/api/favorite/favorited', variable)
//             .then(response => {
//                 if(response.data.success){
//                     setFavorited(response.data.favorited)
//                 } else {
//                     alert('Failed to get Favorite Pokemon Info')
//                 }
//             })
//     }, [])

//     const pokeClickedFavorite = () => {
//         if (Favorited){
//             // Favorite Pokemon
//             // *ADDED 'http://localhost:1337/ 
//             axios.post('/api/favorite/removeFromFavorite', variable)
//             .then(response => {
//                 if(response.data.success){
//                     setFavoriteNumber(FavoriteNumber - 1)
//                     setFavorited(!Favorited)

//                 } else{
//                     alert('Failed to remove this Pokemon')
//                 }
//             })
//         } else{
//             // Not favorite Pokemon
//             // *ADDED 'http://localhost:1337/ 
//             axios.post('http://localhost:1337/api/favorite/addToFavorite', variable)
//             .then(response => {
//                 if(response.data.success){
//                     setFavoriteNumber(FavoriteNumber + 1)
//                     setFavorited(!Favorited)

//                 } else{
//                     alert('Failed to favorite this Pokemon')
//                 }
//             })
//         }
//     }


//     return (
//         <div>
//             <button onClick={pokeClickedFavorite}>{Favorited ? " remove from Favorite " : " Add to Favorite"}{FavoriteNumber}</button>
//             <button onClick={pokeClickedFavorite}>Favorite</button>
//         </div>
//     )
// }


// const mongoose = require('mongoose'); 

import mongoose from "mongoose";

const db = "mongodb+srv://Adrian:1234@cluster0.5opqxgk.mongodb.net/PokeApi?retryWrites=true&w=majority "; 

// mongoose.connect(db).then(() => {})
//         .catch(() => {})

mongoose.connect(db)


const pokemonSchema = new mongoose.Schema({
    userFrom: { type: String},
    pokemonId: { type: String },
    pokemonName: { type: String },
    pokemonImage: { type: String },
    pokemonType: { type: String },
}); 

const Pokemon = mongoose.model('favorite-pokemon', pokemonSchema);

module.exports = Pokemon; 

// userFrom: { type: mongoose.Schema.Types.String, ref: 'User' },
// pokemonId: { type: String },
// pokemonName: { type: String },
// pokemonImage: { type: String },
// pokemonType: { type: String },
