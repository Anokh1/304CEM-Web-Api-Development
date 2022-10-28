import React from 'react'
import Navbar from '../Navbar';
import Footer from '../Footer'; 
import Monster from './Monster';
import './css/Account.css'; 


export default function Account() {

    let x = localStorage.getItem('token')

    async function logoutUser(event){
        event.preventDefault()

        localStorage.removeItem('token');
        localStorage.removeItem('userEmail'); 
        
        window.location.href = '/'; 
    }

    // async function displayMonster(){
    //     const req = await fetch('https://localhost:1337/api/monster', {
    //         headers: {
    //             'x-email': localStorage.getItem('userEmail')
    //         },
    //     })

    //     const data = await req.json()
    //     if(data.status === 'ok'){

    //     } else{
    //         alert(data.error)
    //     }
    // }

    // async function getMonster(event){
    //     event.preventDefault()
    
    //     const response = await fetch('http://localhost:1337/api/getMonsters', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       }, 
    //       body: JSON.stringify({
    //         x
    //       }), 
    //     })
    
    //     const data = await response.json()

    //     console.log(data); 
    //     console.log(x); 
    
    //     if(data.user){
    //       alert('Success')
    //     } else{
    //       alert('Failed')
    //     }
    
    //     // console.log(data); 
    // }

    

    return (
        <>
            <Navbar />
            <div class="main">
                <h1>Account</h1>

                <form onSubmit={logoutUser}>
                    <button class="button logoutButton">Logout</button>
                </form>
            </div>

            <Monster />

            

            <Footer />
        </>
    )
}
