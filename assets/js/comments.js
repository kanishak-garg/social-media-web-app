// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);
        this.createComment(postId);


        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button',this.postContainer).each(function(){
            self.deleteComment($(this));
        });
        $(' .comment-like',this.postContainer).each(function(){
            self.likeComment($(this));
        });
    }


    createComment(postId){
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));
                    pSelf.likeComment($(' .comment-like',newComment));
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, error: function(error){
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom(comment){
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<li id="comment-${comment._id}">
        <p>
            <small><a class="delete-comment-button" href="/comments/delete/${comment._id}">X</a></small>
            ${ comment.content } <br>
                <small>
                ${ comment.user.name}
                </small>
                <div id="like_div_comment">
                    <a href="/likes/toggle/?id=${ comment._id }&type=Comment" class="comment-like" id="like-${comment._id}">
                        <i class="far fa-thumbs-up like_icon_comment "></i>
                        <i class="fas fa-thumbs-up like_icon_comment hide"></i>  
                    </a>
                </div>
        </p>
        <p id="count-${comment._id}">likes: <strong id="counts">0</strong></p>
    </li>`);
    }


    deleteComment(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }

    likeComment(likeLink){
        let likeID = $(likeLink).prop('id');
        // console.log(postID);
        let like_icon = $(`#${likeID} .like_icon_comment`);

        let commentID = likeID.slice(5);

        $(likeLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(likeLink).prop('href'),
                success: function(data){
                    like_icon.toggleClass('hide');
                    var count = $(`#count-${commentID} #counts`).text();

                    if(data.data.deleted){
                        count--;
                    }else{
                        count++;
                    }
                    $(`#count-${commentID} strong`).html(count);
                },error: function(error){
                    console.log(error);
                }

            })

        })
    }
}