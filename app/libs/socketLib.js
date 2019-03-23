const socketio = require('socket.io');
const events = require('events');
const eventEmitter = new events.EventEmitter();
let setServer = (server) => {
    
    let io = socketio.listen(server);

    let myIo = io.of('');
    myIo.on('connection',(socket) => {
        socket.on('join', data => {
            console.log(data+ 'joined a room');
            socket.join(data);
        });
        socket.on('bugUpdate',(args)=>{
            args.forEach(element => {
                console.log(element);
                socket.in(element).emit(element,"Update done room");
                // socket.emit(element,"Update done");
            });
        })
    });
}

module.exports = {
    setServer: setServer
}