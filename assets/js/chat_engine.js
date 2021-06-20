class chatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBoxId = `#${chatBoxId}`;
        this.userEmail = `#${userEmail}`;

        // io comes from socket.io cdn in home.js(accessable globally)
        // 5000 is socket servers port
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler() {
        let self = this;

        this.socket.on('connect',function(){
            console.log("connection established using sockets");

            // we can use any name for 'join_romm'
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial'
            });

            self.socket.on('user_joined',function(data){
                console.log('user joined.. ',data);
            });

        });



        


    }
}