import React from 'react'

const DigimonThumbnail = ({id, name, image, type}) => {

  const style = `digimon-thumb-container ${type}`  

  // user email is saved in Local Storage in login 'Login.js' line 24
  var getEmail = localStorage.getItem('userEmail'); // to send to server

  async function digiClickedFavourite(event) {
    event.preventDefault()

    // server -> index.js
    const response = await fetch('http://localhost:1337/api/favouriteMONSTER', {
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
    if (data.status === 'ok'){
      console.log('Favourite Digimon button ok') // data sent to 'favourite-monster' collection
    }
  }

  // things that you can see
  return (
    <div className={style}>
      <div>
        <button className='favourite-Digimon' onClick={digiClickedFavourite}>❤</button>
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

export default DigimonThumbnail