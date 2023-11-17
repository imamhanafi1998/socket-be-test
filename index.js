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
    
    // socket.emit('newUser', socket.id)
    
    // socket.join('clock-room')
    // socket.join('new-user')
    
    // socket.emit("foo", "test");
    // socket.on("bar", (data) => {
    //     console.log(`bar ${data} received`);
    // });
    socket.on('joined', id => {
        console.log(`${id} has joined `);
        // socket.broadcast.emit('userJoined',`${id} has joined`);
        socket.broadcast.emit('userJoined', id);
        // socket.emit('welcome', id)
    })
    
    socket.on('disconnect',(reason)=>{
        // console.log(reason)
        console.log('client disconnected: ', socket.id);
    })
})

// io.to('new-user').emit('tg', 'new connected')
// socket.emit("hello", "world");
// setInterval(()=>{
//     io.to('clock-room').emit('time', 'test')
// },1000)
server.listen(port, function() {
    console.log(`Listening on port ${port}`);
});