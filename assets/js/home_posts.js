{
    
    let createPost = function(){

        var allDeleteBtns = $('.delete-post-button');
        console.log(allDeleteBtns);
        for(btn of allDeleteBtns){
            deletePost(btn);
        }
        var newPost = $('#new-post');
        newPost.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPost.serialize(),    // data to be sent with req
                success: function(data){  //received data from response

                    let postRender = newPostDom(data.data.post,data.data.username);
                    $('#post-list>ul').prepend(postRender);
                    deletePost($(' .delete-post-button',postRender));
                    noty("success","post added successfully");
                },error: function(error){
                    noty("success","post not added");
                    console.log(error.responseText);
                }
            });

        });
    }

    let newPostDom = function(post,username){
        return $(`<li class="post" id="post-${post._id}">
        <div class="post-content">
            <div class="details">
                <h3>
                    ${username}
                </h3>
                <p>
                    ${ post.content }
                </p>
            </div>
                <div class="delete_post">
                    <a class= "delete-post-button" href="/posts/destroy/${ post._id }">Delete</a>
                </div>
        </div>
        <div>
                <!-- 2 ways to sent the posts id one is using the form action (/posts/comment/?id=<%= post._id %>") 
                    2nd is using hidden input type with predefined value -->
                <form action="/comments/create" id="post-comment" method="POST">
                    <textarea name="content" cols="30" rows="1" placeholder="Comment here ..."
                        required></textarea>
                    <input type="hidden" name="post" value="<%= post._id %>">
                    <input type="submit" value="submit">
                </form>
        </div>
        <ul id="comment-list">
            
        </ul>
    </li>`);
    }


    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    noty("success","post deleted successfully");
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    noty("error","You can not delete this post");
                    console.log(error);
                }

            })
        });
    }
    
    let noty = function(status,message){
        new Noty({
            theme : 'sunset', 
            text: message,
            type: status,
            layout : "topRight",
            timeout : 1500,
            }).show();
    }
     

    createPost();
}

