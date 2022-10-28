// import React, { useEffect, useState } from "react";

// const Monster = ({id, name, image, type}) => {

    // const style = `digimon-thumb-container ${type}`  

//     const [monster, setMonster] = useState('')

//     async function displayMonster(){
//         const req = await fetch('https://localhost:1337/api/monster', {
//             headers: {
//                 'x-email': localStorage.getItem('userEmail')
//             },
//         })

//         const data = await req.json()
//         if(data.status === 'ok'){
//             setMonster(
//                 data.id,
//                 data.name,
//                 data.image,
//                 data.type
//             )
//         } else{
//             alert(data.error)
//         }
//     }

//     useEffect(() => {
//         displayMonster()
//     })

    // return (
    //     <div className={style}>
    //         <div>
    //           <button>Favorite</button>
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

// export default Monster

import React, { useEffect, useState } from 'react';
import DigimonThumbnail from "../components/DigimonThumbnail";

const Monster = () => {


    const [Monster, setMonster] = useState([])

    const style = `digimon-thumb-container ${Monster.type}`  

    async function getMonsters(){
        const req = await fetch('http://localhost:1337/api/monster', {
            headers: {
                'x-email': localStorage.getItem('userEmail'),
            }, 
        })

        const data = await req.json()
        //console.log(data)
        if(data.status === 'ok'){
            setMonster(data.monster
                //data.id,
                // data.name,
                // data.image,
                // data.type, 
            )
        
        } else{
            alert(data.error)
        }

        console.log(data); 
        console.log(data.monster[1]); 
        //console.log(setMonster(data.monster)); 
        //console.log(Monster); // empty string
    }

    useEffect(() => {
        const email = localStorage.getItem('userEmail')
        if(!email){
            console.log('Invalid access')
        } else{
            getMonsters()
        }
    }, [])

    return(
        // <div className={style}>
        //     <div>
        //       <button>Favorite</button>
        //     </div>
        //     <div className='number'>
        //         {/* <small>#0{monster.id}</small> */}
        //         <small>#0{setMonster}</small>
        //     </div>
        //     <img src={Monster.image} alt={Monster.name}/>
        //     <div className="detail-wrapper">
        //         <h1>{Monster.name}</h1>
        //         <small>Type: {Monster.type}</small>
        //     </div>
        // </div>
        
        <div className="digimon-app-container">
            <h1>Favourite</h1>
            <div className="digimon-container">
            <div className="all-container"> 
                {
                Monster.map((digimon, index) => 
                    <DigimonThumbnail
                    id={digimon.pokemonId}
                    name={digimon.pokemonName}
                    //image={pokemon.sprites.other.dream_world.front_default}
                    //image={pokemon.sprites.other.home.front_default}
                    image={digimon.pokemonImage}
                    type={digimon.pokemonType}
                    key={index}
                    />  
                )}
            </div>
            {/* <button className="load-more" onClick={() => getAllDigimons()}>More Digimons</button> */}
            </div>
        </div>

      )
}

export default Monster