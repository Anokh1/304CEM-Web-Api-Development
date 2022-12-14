import React, { useState, useEffect } from "react";
import PokemonThumbnail from "../components/PokemonThumbnail";
import './css/pokemon.css'; 
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer"; 

function Pokemon(){
    const [allPokemons, setAllPokemons] = useState([])
    // load 12 Pokemons based on the limit set 'pokemon?limit=12'
    // load the next 12 Pokemons when the 'More Pokémons' is clicked
    const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=12')
  
    const getAllPokemons = async () => {
      const res = await fetch(loadMore)
      const data = await res.json()
  
      setLoadMore(data.next)

      function createPokemonObject(result){
        //console.log(result[0]);
        result.forEach( async (pokemon) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          const data = await res.json()
          setAllPokemons(currentList => [...currentList, data])
        })
      }
      createPokemonObject(data.results)
    }
  
    useEffect(() => {
      getAllPokemons()
    }, [])
  
    // things that you can see
    return (
        <>
        <Navbar /> {/* Navigation Bar */}
          <div className="app-container">
            <h1>Pokémon</h1>
              <div className="pokemon-container">
                <div className="all-container"> 
                  { allPokemons.map((pokemon, index) => 
                    <PokemonThumbnail
                        id={pokemon.id}
                        name={pokemon.name}
                        //image={pokemon.sprites.other.dream_world.front_default} // PIXEL POKEMON
                        //image={pokemon.sprites.other.home.front_default} // NOT SHINY POKEMON
                        image={pokemon.sprites.other.home.front_shiny} // SHINY POKEMON
                        type={pokemon.types[0].type.name}
                        key={index}
                    />  
                    )}
                </div>
                  <button className="load-more" onClick={() => getAllPokemons()}>More Pokémons</button>
              </div>
            </div>
            <br></br>
          <Footer />
        </>      
    );
}

export default Pokemon; 