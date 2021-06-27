class chatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBoxId = `${chatBoxId}`;
        this.userEmail = `${userEmail}`;
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
                $.ajax({
                    type: 'post',
                    url: '/send-message',
                    data:{'message': msg },
                    success: function(data){
                        console.log("data",data);
                        let newMessage = $('<li>');
                        
                        newMessage.append($('<sub>',{
                            'html':data.data.newMessage.user.name
                        }));
    
                        newMessage.append($('<span>',{
                            'html':data.data.newMessage.content
                        }));
    
                        newMessage.addClass('self-message');
                        $('#chatbox').append(newMessage);
                        self.socket.emit('send_message',{
                            'data':data,
                            'chatroom':'codeial'
                        });
                }, error: function(error){
                        console.log(error.responseText);
                    }
                });
            }
        });

        self.socket.on('receive_message',function(data){
            console.log("message received",data);
            console.log('email check ',data.data.data.newMessage.user.email,self.userEmail);
            if(data.data.data.newMessage.user.email == self.userEmail){
               
                return;
            }
            let newMessage = $('<li>');
            
            newMessage.append($('<sub>',{
                'html':data.data.data.newMessage.user.name
            }));

            newMessage.append($('<span>',{
                'html':data.data.data.newMessage.content
            }));

            newMessage.addClass('other-message');
            $('#chatbox').append(newMessage);
        });
    }
}