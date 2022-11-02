import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import './css/Register.css'; 

function App() {
  const navigate = useNavigate(); 
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // register function runs when users clicked 'Create Account'
  async function registerUser(event){
    event.preventDefault()

    // server -> index.js
    const response = await fetch('http://localhost:1337/api/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify({
        name,
        email,
        password,
      }), 
    })
    const data = await response.json()
    //console.log(data);    
    if(data.status === 'ok'){
      navigate('/login') // go to login page once registered successfully 
    }
  }

  // things that you can see
  return (
    <div class="registerContainer">
      <div class="registerForm">
        <h1>Create Account</h1>
        <form onSubmit={registerUser}>
          <input class="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name" 
          />
          <br />
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
          <input class="submitButton" type="submit" value="Create Account" />
        </form>
      </div>    
  </div>
  )  
}

export default App;
