const tagService = require('../modules/tag_module')


module.exports = {
//get all tags 
    getAllTagsRoute:(res,userid) =>{
        tagService.getAllTags(userid).then(function (result) {
    res.status(200).json({
        message:"all tags",
        tags:result})
    })
},
//add tag
    addTagRoute:(req,res)=>{
        var tag = {
            tagName:req.body.tagName,
            color:req.body.color,
            user:req.body.user
        }
        try{

            tagService.addTag(tag,res)

        } catch(error){
            console.log(error)
        }
        
    },
//delete tag route
    deleteTagRoute: (id,res)=>{
        try {
            tagService.deleteTaskById(id)
            res.status(200).json("tag deleted successfully !")
        } catch (error) {
            console.log(error)
        }
    },
//update tag route
    updateTagRoute:(id,reqBody,res)=>{
        try {
            taskServie.updateTag(reqBody,id)
            res.status(200).json("tag updated successfully !")
        } catch (error) {
            console.log(error)
        }
    }
}

