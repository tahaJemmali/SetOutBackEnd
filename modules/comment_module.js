const commentSchema = require('../entites/comment')
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

module.exports = {
    AddComment: async (comment) => {

    await new commentSchema(comment).save()
        console.log('comment added');
        //response.status(200).json({message:"post added"});
    }
}
