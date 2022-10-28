// "use strict";
// import styles from '../styles/Home.module.css';
// import React, { useState, useEffect } from 'react';
// import useSWR from 'swr'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'


// function FavoriteButton(props) {

//     console.log(props)

//     useEffect(() => {
//         const loggedInUser = localStorage.getItem('userEmail');
//         if (loggedInUser) {
//             console.log(loggedInUser)
//         }
//     }, []);
// }

// function FindInitialState(props) {

//     let favBool;

//     const fetcher = url => fetch(url).then(r => r.json())
//     const { data, error } = useSWR(`/api/users/${props.userEmail}/recipes/${props.recipeId}`, fetcher)
    
//     console.log("This user has this recipe favorited?", data)
//     if (error) return <div>failed to load</div>
//     if (data === undefined) return <div>loading...</div>

//     favBool = data;

//     return <SetStateAndToggle favBool={favBool} userId={props.userId} recipeId={props.recipeId}/>
// }
