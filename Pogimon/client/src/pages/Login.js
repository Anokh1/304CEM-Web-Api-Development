import { useState } from "react";
import './css/Login.css'; 

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // login function runs when users clicked 'Login' 
  async function loginUser(event){
    event.preventDefault()
    
    // server -> index.js
    const response = await fetch('http://localhost:1337/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({
        email,
        password,
      }), 
    })
    const data = await response.json()
    if(data.user){
      localStorage.setItem('token', data.user) // store jwt token
      localStorage.setItem('userEmail', email) // store the email for user to favourite Pokemon or Digimon
                                               // identify the favorite monster based on userEmail
      alert('Login successful')
      window.location.href = '/home' // redirect to home screen when login is successful 
    } else{
      alert('Incorrect username or password')
    }
    // console.log(data); 
  }

  // go to register page
  // for first time user to register an account to access the website
  async function registerPage(event){
    event.preventDefault()

    window.location.href = '/register'
    //console.log('going to register')
  }

  // things that you can see
  return ( 
    <div class="loginContainer">
      <div class="loginForm">
        <h1>Login</h1>
        <form onSubmit={loginUser}>
          <input class="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email" 
          />
          <br />
          <input class="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password" 
          />
          <br />
          <input class="submitButton" type="submit" value="Login" />
          <br />
        </form>        
      </div>
      <form onSubmit={registerPage}>
          <button class="registerButton">Register</button>
      </form>
    </div>
  )  
}

export default App;
