module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);
    
    io.sockets.on('connection', function(socket){
        console.log('new connection received',socket.id);
        
        socket.on('disconnect',function(){
            console.log('socket disconnected');
        });

        socket.on('join_room',function(data){
            console.log('room joining req' ,data);
            socket.join(data.chatroom);

            // in(data.chatroom) will emit event in particular room io.emit() will wmit it all over
            io.in(data.chatroom).emit('user_joined',data);
        });

        socket.on('send_message',function(data){
            console.log('mess emited');
            io.in(data.chatroom).emit('receive_message',data);
        });
    
    })
}