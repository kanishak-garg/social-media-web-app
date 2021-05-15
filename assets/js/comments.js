{
    let createComment = function(){
        var postComment = $('#post-comment');
        postComment.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url: '/comments/create',
                data: postComment.serialize(),
                success: function(data){
                    let newComment = newCommentDom(data.data.comment,data.data.username);
                    $(`#comment-list-${data.data.postId}`).prepend(newComment);
                }, error: function(error){
                    console.log(error);
                }
            });
        });
    }

    let newCommentDom = function(comment,username){
        return $(`<li id="comment-${comment._id}">
        <p>
        ${comment.content } <br>
                <small>
                    ${username}
                </small>
        </p>
            <a class="comment-delete-btn" href="/comments/delete/${comment._id}">X</a>
    </li>`);
    }

        createComment();

    
}