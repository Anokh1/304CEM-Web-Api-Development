import { React } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Pokemon from './pages/Pokemon'
import Digimon from './pages/Digimon'
import Home from './pages/Home'; 
import Account from './pages/Account';

function App() {

    let x = localStorage.getItem('token') 

    // if the user is logged in, there will be a token in Local Storage
    // only allow these routes, when they are logged in or token is available in Local Storage
    if(x){
        return(
            <div>
                <BrowserRouter>
                    <Routes>
                        {/* just set the path to "/" only... */}
                        <Route exact path="/" element={<Login/>} />
                        <Route exact path="/login" element={<Login/>} />
                        <Route exact path="/register" element={<Register/>} />
                        <Route exact path="/dashboard" element={<Dashboard/>} />
                        <Route exact path="/pokemon" element={<Pokemon/>} />
                        <Route exact path="/digimon" element={<Digimon/>} />
                        <Route exact path="/home" element={<Home/>} />
                        <Route exact path="/account" element={<Account/>} />
                    </Routes>
                </BrowserRouter>    
            </div>
        )
    } else{
        // only can access the Register and Login page if users 
        // does not have an account
        console.log('No token, nothing')
        return(
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Login/>} />
                        <Route exact path="/register" element={<Register/>} />
                        <Route exact path="/login" element={<Login/>} />    
                    </Routes>
                </BrowserRouter>    
            </div>
        )
    }    
}

export default App