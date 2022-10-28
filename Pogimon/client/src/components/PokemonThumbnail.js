// import React from 'react'
// import PokemonFavorite from './PokemonFavorite'

// const PokemonThumbnail = ({id, name, image, type}) => {

//   const style = `thumb-container ${type}`  



//   return (
//     <div className={style}>
//         <div className='shiny-button'>
//             <button>SHINY</button>
//             <span></span>
//             <PokemonFavorite userFrom={localStorage.getItem('userEmail')} pokemonId={id} pokemonName={name} pokemonImage={image} pokemonType={type} />
//         </div>
//         <div className='number'>
//             <small>#0{id}</small>
//         </div>
//         <img src={image} alt={name}/>
//         <div className="detail-wrapper">
//             <h1>{name}</h1>
//             <small>Type: {type}</small>
//         </div>
//     </div>
//   )
// }

// export default PokemonThumbnail


import React from 'react'
// import PokemonFavorite from './PokemonFavorite'

const PokemonThumbnail = ({id, name, image, type}) => {

  const style = `thumb-container ${type}` 

  // const mongoose = require('mongoose'); 
  // const Record = require(PokemonFavorite); 
  // const axios = require('axios'); 

  // const db = "mongodb+srv://Adrian:1234@cluster0.5opqxgk.mongodb.net/PokeApi?retryWrites=true&w=majority "; 

  // const pokemonSchema = new mongoose.Schema({
  //   userFrom: { type: String},
  //   pokemonId: { type: String },
  //   pokemonName: { type: String },
  //   pokemonImage: { type: String },
  //   pokemonType: { type: String },
  // }); 

  // const Pokemon = mongoose.model('favorite-pokemon', pokemonSchema);


  //const Name = {name};

  //const querystr = `https://pokeapi.co/api/v2/pokemon/${Name}`;
  var getEmail = localStorage.getItem('userEmail'); // to send to server

  // var getName;
  // var getId;
  // var getImage; 
  // var getType; 

  // var pokeValue; 

  async function pokeClickedFavorite(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:1337/api/favoritePokemon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        getEmail,
        id,
        name,
        image,
        type
      })
    })

    const data = await response.json()

    if (data.status === 'ok'){
      console.log('Favorite Pokemon button ok')
    }

    //mongoose.connect(db); 
    // const Pokemon = mongoose.model('favorite-pokemon', pokemonSchema);

    // axios.get(querystr).then( (response) => {
    //   getName = response.data.name;
    //   getId = response.data.id;
    //   getImage = response.data.sprites.other.home.front_shiny;
          
          // pokeValue = new Pokemon({
          //     userFrom: getEmail,
          //     pokemonId: getId,
          //     pokemonName: getName,
          //     pokemonImage: getImage,
          //     pokemonType: getType
          // }); 
      
          // pokeValue.save().then(result => {})
          // .catch(error => {})
    // });
  }

  
  
  return (
    <div className={style}>
        <div className='shiny-button'>
            {/* <button>SHINY</button> */}
            <span></span>
            {/* <PokemonFavorite userFrom={localStorage.getItem('userEmail')} pokemonId={id} pokemonName={name} pokemonImage={image} pokemonType={type} /> */}

            <button onClick={pokeClickedFavorite}>Favorite</button>

        </div>
        <div className='number'>
            <small>#0{id}</small>
        </div>
        <img src={image} alt={name}/>
        <div className="detail-wrapper">
            <h1>{name}</h1>
            <small>Type: {type}</small>
        </div>
    </div>
  )
}

export default PokemonThumbnail