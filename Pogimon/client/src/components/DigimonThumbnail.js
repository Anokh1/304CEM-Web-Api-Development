import React from 'react'

const DigimonThumbnail = ({id, name, image, type}) => {

  const style = `digimon-thumb-container ${type}`  

  var getEmail = localStorage.getItem('userEmail'); // to send to server

  async function digiClickedFavorite(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:1337/api/favoriteDigimon', {
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
      console.log('Favorite Digimon button ok')
    }
  }

  return (
    <div className={style}>
        <div>
          <button onClick={digiClickedFavorite}>Favorite</button>
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