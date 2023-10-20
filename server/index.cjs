// // Node Server Handling Socket.io connections.
// const io = require('socket.io')(4000)
// const users = {};
// const cors = require('cors');
// const corsOptions ={
//     origin: "http://localhost:5500", 
//     credentials:true,            //access-control-allow-credentials:true
//     methods: ["GET", "POST"],
//     transports: ["websocket", "polling"], 
    
// }
// io.use(cors(corsOptions));
// // Listens multiple connections
// io.on('conection',socket=>{
//     socket.on('new-user-joined',name=>{
//         console.log("User",name)
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined',name)
//     });
//     socket.on('send',message=>{
//         socket.broadcast.emit('receive',{message:message, name:user[socket.id]})
//     });
//     })

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const users = {};
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5500"
    }
  });
app.get('/', (req, res) => {
  res.sendFile("C://users/hp/1DS/Socket_chat/index.html");
});

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });
io.on('connection',(socket)=>{
    socket.on('new-user-joined',(name)=>{
    users[socket.id] = name;
    socket.broadcast.emit('user-joined',name)
    })
    socket.on('send',message=>{
    socket.broadcast.emit('receive',{message:message, name:users[socket.id]})
    });
    socket.on('disconnect',message=>{
    socket.broadcast.emit('quit',users[socket.id])
    delete users[socket.id]
    });
    });

server.listen(4000, () => {
  console.log('listening on *:4000');
});