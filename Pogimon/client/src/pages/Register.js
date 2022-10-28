import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import './css/Register.css'; 

function App() {
  const navigate = useNavigate(); 
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(event){
    event.preventDefault()

    const response = await fetch('http://localhost:1337/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        name,
        email,
        password,
      }), 
    })

    const data = await response.json()

    //console.log(data);
    
    if(data.status === 'ok'){
      navigate('/login')
    }
  }

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
