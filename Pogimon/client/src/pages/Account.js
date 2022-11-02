import React from 'react'; 
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer'; 
import Monster from '../components/Monster'; // to load the favourite monsters (Pokemon & Digimon)
import './css/Account.css'; 

export default function Account() {
    // to display the current user email address for identification 
    let email = localStorage.getItem('userEmail'); 

    // logout function runs when user clicked 'Logout'
    async function logoutUser(event){
        event.preventDefault()

        // clear Local Storage to prevent users without these information to access Pogimon
        localStorage.removeItem('token'); 
        localStorage.removeItem('userEmail'); 
        
        window.location.href = '/'; // brings back to login screen
    }
    
    // things that you can see
    return (
        <>
            <Navbar />
            <div class="main">
                <h1>Account</h1>
                <h2>{email}</h2>
                <form onSubmit={logoutUser}>
                    <button class="button logoutButton">Logout</button>
                </form>
            </div>
            <Monster />  
            <br></br>       
            <Footer />
        </>
    )
}
