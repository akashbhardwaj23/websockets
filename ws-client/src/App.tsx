import {useState } from 'react'
import './App.css'
import { useSocket } from './hooks/useSocket';

function App() {
  
  const [message, setMessage] = useState("");
  
  const {socket, latestMessage} = useSocket();

  if(!socket){
    return <div>
      Loading...
    </div>
  }

  return (
    <>
     <div>

    <input type="text" onChange={(e) => setMessage(e.target.value)}/>

    <button onClick={() => {
      socket.send(message)
    }}>Send</button>
  <div>
    {latestMessage}
  </div>
     </div>
    </>
  )
}

export default App
