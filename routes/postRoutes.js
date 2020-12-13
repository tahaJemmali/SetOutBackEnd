const postService = require('../modules/post_module')
const userService = require('../modules/user_module')

module.exports = {

//AddPost
    AddPost : (request,response) => {
        var post_data = request.body;

        var user_email = post_data.user_id;
        var title = post_data.title;
        var description = post_data.description;
        var image = post_data.image;

        /*console.log('the user email : '+user_email);
        console.log('the title : '+title);
        console.log('the description : '+description);
        console.log('the image : '+image);*/

        userService.getUserByEmail(user_email).then(function (user) {
            //console.log(' the user : '+user)
            postService.AddPost(user,title,description,image,response);

        })
    },
    GetPosts : (request,response) => {

        postService.getAllPosts().then(function (result) {
            response.status(200).json({
                message:"all posts",
                posts:result})

        })
    },
    LikePost : (request,response) => {
        //console.log('?????????????WHY')
        var put_data = request.body;

        var post_id = put_data.post_id;
        var user_liked_email = put_data.user_liked_email;

        //console.log(post_id)
        //console.log(user_liked_email)

        var post;
        //console.log('aa')
        postService.getPostById(post_id).then(function (post) {
            post = post;
            //console.log('aaa')
            userService.getUserByEmail(user_liked_email).then(function (user) {
                //console.log(user)
                post.likedBy.push(user);
                postService.updatePost(post,post.id);
                response.status(200).json({message:"post liked"})
            });
        });

    },
    UnLikePost : (request,response) => {
        //console.log('?????????????WHY')
        var put_data = request.body;

        var post_id = put_data.post_id;
        var user_unLiked_email = put_data.user_unLiked_email;

        //console.log(post_id)
        //console.log(user_liked_email)

        var post;
        //console.log('aa')
        postService.getPostById(post_id).then(function (post) {
            post = post;
            //console.log('aaa')
            userService.getUserByEmail(user_unLiked_email).then(function (user) {
                //console.log(user)
                post.likedBy.pull(user);
                postService.updatePost(post,post.id);
                response.status(200).json({message:"post unLiked"})
            });
        });

    },GetComments: (post_id,request,response) => {

        postService.getPostById(post_id).then(function (post) {
            var comments = post.comments

            //console.log(comments)
           // console.log("rrrrrrrrr")

            response.status(200).json({
                message:"comment list",
                comments:comments})

        });

    }
}











