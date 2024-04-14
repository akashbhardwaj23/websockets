import { useEffect, useState } from "react";

export function useSocket(){
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [latestMessage, setLatestMessages] = useState("");


  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:3000');
    
    newSocket.onopen = () => {
      console.log('Connected to server')
      setSocket(newSocket)
      newSocket.send("Hi from Server")
    }

    newSocket.onmessage = (message) => {
      console.log('Message from server:', message.data);
      setLatestMessages(message.data)
    }

    return () => newSocket.close();

  }, []);



  return {socket, latestMessage}

}