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

        $('#send-message').click(function(){
            let msg = $('#message').val();

            if(msg != ''){
                self.socket.emit('send_message',{
                    message:msg,
                    user_email:self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message',function(data){
            console.log("message received",data.message);
            let socketData = data;
            if(data.user_email == self.userEmail){
                return;
            }
            $.ajax({
                type: 'post',
                url: '/send-message',
                data: data,
                success: function(data){
                    let newMessage = $('<li>');

                    let messageType = 'other-message';            
                    if(socketData.user_email == self.userEmail){
                        messageType = 'self-message';
                    }
                    
                    newMessage.append($('<sub>',{
                        'html':data.data.newMessage.user.name
                    }));

                    newMessage.append($('<span>',{
                        'html':data.data.newMessage.content
                    }));

                    newMessage.addClass(messageType);
                    $('#chatbox').append(newMessage);
            }, error: function(error){
                    console.log(error.responseText);
                }
            });

        })
    }
}