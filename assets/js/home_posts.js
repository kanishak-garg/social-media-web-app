{
    let createPost = function(){
        
        var newPost = $('#new-post');
        newPost.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPost.serialize(),    // data to be sent with req
                success: function(data){  //received data from response
                    let postRender = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(postRender);
                    deletePost($(' .delete-post-button',postRender));
                    likePost($(' .Postlike',postRender),data.data.post._id);
                    new PostComments(data.data.post._id);
                    noty("success","post added successfully");
                },error: function(error){
                    noty("success","post not added");
                    console.log(error.responseText);
                }
            });

        });
    }

    let newPostDom = function(post){
        return $(`<li class="post" id="post-${post._id}">
        <div class="post-content">
            <div class="details">
                <h3>
                    ${post.user.name}
                </h3>
                <p>
                    ${ post.content }
                </p>
                <p id="count-${post._id}">likes: <strong id="counts">0</strong></p>

            </div>
            <div class="like_div_post">
                <a class="Postlike" href="/likes/toggle/?id=${post._id}&type=Post" id="like-${post._id}">
                    <i class="far fa-thumbs-up fa-2x like_icon_post"></i>
                    <i class="fas fa-thumbs-up fa-2x hide like_icon_post"></i>  
                </a>
            </div>
                <div class="delete_post">
                    <a class= "delete-post-button" href="/posts/destroy/${ post._id }">Delete</a>
                </div>
        </div>
        <div>
                <form action="/comments/create" class="post-comment" id="post-${ post._id }-comments-form" method="POST">
                    <textarea name="content" cols="30" rows="1" placeholder="Comment here ..."
                        required></textarea>
                    <input type="hidden" name="post" value="${post._id }">
                    <input type="submit" value="submit">
                </form>
        </div>
        <ul class="comment-list"  id="post-comments-${post._id }">
            
        </ul>
    </li>`);
    }


    let deletePost = function(deleteLink){
        // console.log(deleteLink);
        // let likeID = $(deleteLink).prop('href');
        // console.log(likeID);
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

    let likePost = function(likeLink,postID){
        // console.log("likelink",likeLink);
        let likeID = $(likeLink).prop('id');
        // console.log(postID);
        let like_icon = $(`#${likeID} .like_icon_post`);
        // console.log("like icon",like_icon[0]);
        $(likeLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(likeLink).prop('href'),
                success: function(data){
                    noty("success","liked the post");
                    like_icon.toggleClass('hide');
                    var count = $(`#count-${postID} #counts`).text();

                    if(data.data.deleted){
                        count--;
                    }else{
                        count++;
                    }
                    $(`#count-${postID} strong`).html(count);
                },error: function(error){
                    noty("error","error in like the post");
                    console.log(error);
                }

            })

        })
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
     


    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){

            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
            
            let likeButton = $(' .Postlike',self);
            likePost(likeButton,postId);
        });
    }



    createPost();
    convertPostsToAjax();
}

