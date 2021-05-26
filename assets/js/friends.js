
let FriendToggler = function(){
    addLink = $(".add-friend");
    deleteLink = $(".remove-friend");

    $(addLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type:'get',
            url:addLink.prop('href'),
            success: function(data){
                $(addLink).hide();
                $(deleteLink).show();
                new Noty({
                    theme: 'relax',
                    text: "friend added",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },error: function(error){
                console.log(error.responseText);
            }
        });
    });
    
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type:'get',
            url:deleteLink.prop('href'),
            success: function(data){
                $(addLink).show();
                $(deleteLink).hide();
                new Noty({
                    theme: 'relax',
                    text: "friend removed",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            },error: function(error){
                console.log(error.responseText);
            }
        })
    });
}

FriendToggler();