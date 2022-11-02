import React, { useEffect, useState } from 'react';
import MonsterThumbnail from "./MonsterThumbnail";
import Love from "../images/Love.PNG" // image for when there is no favourite monster


const Monster = () => {
    const [Monster, setMonster] = useState([])
    const style = `digimon-thumb-container ${Monster.type}`  

    async function getMonsters(){
        // server -> index.js
        // connect to MongoDB to get Favorite monsters information
        const req = await fetch('http://localhost:1337/api/monster', {
            headers: {'x-email': localStorage.getItem('userEmail')}, 
        })
        const data = await req.json()
        //console.log(data)
        if(data.status === 'ok'){
            setMonster(data.monster) // favorite monsters information available     
        } else{
            alert(data.error) // favorite monsters information unavailable 
        }
         console.log(data); 
        // console.log(data.monster[1]); 
    }

    // call getMonsters() function if there is email address in the Local Storage
    // FireFox: Inspect -> Storage -> Local Storage
    // EXAMPLE: userEmail : happy@gmail.com
    useEffect(() => {
        const email = localStorage.getItem('userEmail')
        if(!email){
            console.log('Invalid access')
        } else{
            getMonsters() // GET MONSTERSSS
        }
    }, [])

    // things that you can see
    // if there is any favourite monster, it will be displayed
    // if none, a text and image will be loaded

    if(Monster.length !== 0){
        console.log('Not Empty'); 
        return(
            <div className="digimon-app-container">
                <div className="digimon-container">
                    <div className="all-container"> 
                        {
                        Monster.map((monster, index) => 
                            <MonsterThumbnail
                            id={monster.monsterId}
                            name={monster.monsterName}
                            image={monster.monsterImage}
                            type={monster.monsterType}
                            key={index}
                            />  
                        )}
                    </div>
                </div>
            </div>
          )
    } else{
        console.log('Empty'); 
        return(
            <div className="digimon-app-container">
                <h1>You have yet to Favourite any Pokemon or Digimon</h1>
                <img src={Love} alt={'happy'} style={{width: '880px', height:'380px'}}/>
                <div className="digimon-container">
                    <div className="all-container"> 
                    </div>
                </div>
            </div>
          )        
    }    
}

export default Monster