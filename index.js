const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});
const port = process.env.PORT || 5000;

io.on('connection',(socket)=>{
    console.log('client connected: ', socket.id)

    socket.broadcast.emit('userJoined', socket.id)
    
    socket.on('disconnect',(reason)=>{
        console.log('client disconnected: ', socket.id);
        socket.broadcast.emit('userLeft', socket.id)
    })
})

server.listen(port, function() {
    console.log(`Listening on port ${port}`);
});