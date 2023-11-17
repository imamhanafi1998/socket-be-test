const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});
const port = process.env.PORT || 5000;

io.on('connection',(socket)=>{
    console.log('client connected: ',socket.id)
    
    socket.join('clock-room')
    
    socket.on('disconnect',(reason)=>{
        console.log(reason)
    })
})
setInterval(()=>{
    io.to('clock-room').emit('time', new Date())
},1000)
server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});