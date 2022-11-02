import React from 'react'; 
import './MonsterThumbnail.css'

const MonsterThumbnail = ({id, name, image, type}) => {
  const style = `digimon-thumb-container ${type}`  
  var getEmail = localStorage.getItem('userEmail'); // to send to server

  async function removeMonster(event) {
    event.preventDefault()
    // server -> index.js
    // send the details of the monster to be removed from Favourites
    const response = await fetch('http://localhost:1337/api/removeMonster', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        getEmail,
        id,
        name,
        image,
        type
      })
    })

    const data = await response.json()

    // monster removed from favourites successfully 
    if (data.status === 'ok'){
      console.log('Remove monster button ok'); 
      window.location.href = '/account'; // Reload the page to load the latest data 
    }
  }

  // things that you can see
  return (
    <div className={style}>
        <div>
          <button className='remove-Monster' onClick={removeMonster}>✖</button>
        </div>
        <div className='number'>
            <small>#0{id}</small>
        </div>
        <img src={image} alt={name} style={{width: '320px', height:'320px'}}/>
        <div className="detail-wrapper">
            <h1>{name}</h1>
            <small>Type: {type}</small>
        </div>
    </div>
  )
}

export default MonsterThumbnail