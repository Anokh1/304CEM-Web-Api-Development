import React, { useState, useEffect } from "react";
import DigimonThumbnail from "../components/DigimonThumbnail";
import './css/digimon.css'; 
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer"; 

//const cors = require("cors");  

function Digimon(){
    let number = 0; // to change the page number
    // each page only display 5 Digimons 
    // some Digimons have missing or empty field making it difficult
    // to load and save those Digimon's information
    // FOR EXAMPLE: Mach Leomon
    // https://digimon-api.com/api/v1/digimon/mach%20leomon
    const [allDigimons, setAllDigimons] = useState([])
    const [loadMore, setLoadMore] = useState(`/api/v1/digimon?page=${number}`)
    
      const getAllDigimons = async () => {
      const res = await fetch(loadMore)
      const data = await res.json()
  
      setLoadMore(data.next)
      
      function createDigimonObject(content){
        content.forEach( async (digimon) => {
          // get data from DAPI 
          const res = await fetch(`/api/v1/digimon/${digimon.name}`)
          const data = await res.json()
          //console.log(data); 
          setAllDigimons(currentList => [...currentList, data])
        })
      }
      createDigimonObject(data.content)
    }
  
    useEffect(() => {
      getAllDigimons()
    }, [])
    
    // things that you can see
    return (
        <>
        <Navbar /> {/* Navigation Bar */}
          <div className="digimon-app-container">
            <h1>Digimon</h1>
              <div className="digimon-container">
                <div className="all-container"> 
                  {
                    allDigimons.map((digimon, index) => 
                      <DigimonThumbnail
                        id={digimon.id}
                        name={digimon.name}
                        image={digimon.images[0].href}
                        type={digimon.types[0].type}
                        key={index}
                      />  
                  )}
                </div>
              </div>
          </div> 
        <br></br>
        <Footer />   
        </>
    );
}

export default Digimon; 