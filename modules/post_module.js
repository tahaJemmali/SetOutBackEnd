const postSchema = require('../entites/post')
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

module.exports = {
    AddPost: async (user,title,description,image,response) => {

        var post = {
            'title': title,
            'description': description,
            'image': image,
            'postedBy': user.id,
        };

    await new postSchema(post).save()
        console.log('post added');
        response.status(200).json({message:"post added"});

    },getAllPosts:async ()=> {
        return posts = await postSchema.find({}).sort({ post_date : -1 }).populate('postedBy').populate('likedBy').populate({path : 'comments', populate : {path : 'user'}})
    },getPostById:async (id)=> {
        //console.log('get all users by email !');
        return post = await postSchema.findOne({'_id': id}).populate('postedBy').populate('likedBy').populate({path : 'comments', populate : {path : 'user'}});
    },
    updatePost:async (post,id)=>{
        await postSchema.findByIdAndUpdate({_id:id},post)
        console.log('post updated successfully in mongoDB !')
    }
}
