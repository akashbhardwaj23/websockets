import WebSocket, {WebSocketServer} from "ws";
import http from "http";


const server = http.createServer((req:any, res:any) => {
    console.log((new Date()).toString()," Received Request for ", req.url);
    res.end("Hi there")
})

const wss = new WebSocketServer({server});

wss.on("connection", (ws) => {
    console.log("New Connection")
    ws.on("error", (err) => {
        console.log("Error: ", err) 
    });
    
    ws.on("message", (data, isBinary) => {
        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN) {
                client.send(data, {binary: isBinary})
            }
        })
    });

    ws.send("Hi there from ws server")
})



server.listen(3000, () => {
    console.log("Server is running on port 3000")
})