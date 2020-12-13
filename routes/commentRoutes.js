const commentService = require('../modules/comment_module')
const userService = require('../modules/user_module')
const postService = require('../modules/post_module')

const commentSchema = require('../entites/comment')

module.exports = {

//PostComment
    PostComment : (mes) => {


        data = mes.utf8Data;

        const json = data;
        const obj = JSON.parse(json);

        var user_email = obj.current_user_email
        var text  = obj.message
        var post_id = obj.post_id;

        //console.log(user_email)
        //console.log(text)
        //console.log(post_id)

        var post;
        postService.getPostById(post_id).then(function (post) {
            post = post;
            userService.getUserByEmail(user_email).then(function (user) {

                var comment = new commentSchema();
                comment.user = user;
                comment.text = text;

                commentService.AddComment(comment);
                post.comments.push(comment);
                postService.updatePost(post,post.id);
                //post.likedBy.pull(user);
                //postService.updatePost(post,post.id);
                //response.status(200).json({message:"post unLiked"})
            });
        });

        //

    }
}











