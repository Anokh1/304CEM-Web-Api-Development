import React, { useState, useEffect } from "react";
import DigimonThumbnail from "../components/DigimonThumbnail";
import Navbar from "../Navbar";
import Footer from "../Footer"; 

const cors = require("cors");  

function Digimon(){
    const [allDigimons, setAllDigimons] = useState([])
    const [loadMore, setLoadMore] = useState(`/api/v1/digimon`)
    
      const getAllDigimons = async () => {
      const res = await fetch(loadMore)
      const data = await res.json()
  
      setLoadMore(data.next)
      
      function createDigimonObject(content){
        content.forEach( async (digimon) => {
          const res = await fetch(`/api/v1/digimon/${digimon.name}`)


          const data = await res.json()

          console.log(data); 

          setAllDigimons(currentList => [...currentList, data])

        })
      }
      createDigimonObject(data.content)

    }
  
    useEffect(() => {
      getAllDigimons()
    }, [])
    
  
    return (
        <>
        <Navbar /> {/* Navigation Bar */}
            <div className="digimon-app-container">
            <h1>Digimon Evolution</h1>
            <div className="digimon-container">
            <div className="all-container"> 
                {
                allDigimons.map((digimon, index) => 
                    <DigimonThumbnail
                    id={digimon.id}
                    name={digimon.name}
                    //image={pokemon.sprites.other.dream_world.front_default}
                    //image={pokemon.sprites.other.home.front_default}
                    image={digimon.images[0].href}
                    type={digimon.types[0].type}
                    key={index}
                    />  
                )}
            </div>
            {/* <button className="load-more" onClick={() => getAllDigimons()}>More Digimons</button> */}
            </div>
        </div> 
        <br></br>
        <Footer />   
        </>
    );
}

export default Digimon; 