import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessage, setLatestMessages] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:3000');
    
    newSocket.onopen = () => {
      console.log('Connected to server')
      newSocket.send("Hi from Server")
    }

    newSocket.onmessage = (message) => {
      console.log('Message from server:', message.data);
      setLatestMessages(message.data)
    }

    setSocket(newSocket)

    return () => newSocket.close();

  }, [])

  if(!socket){
    return <div>
      Loading...
    </div>
  }


  return (
    <>
     <div>
      Hi there

    <input type="text" />

    <button onClick={() => {
      socket.send("Hi there whats up")
    }}>Send</button>
      {JSON.stringify(socket)}

      {latestMessage}
     </div>
    </>
  )
}

export default App
