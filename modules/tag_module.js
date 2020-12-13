const tagSchema = require('../entites/tag')
var resMsg = {
    message:String
}
module.exports = {
    addTag: async (tag,res) => {
        try {
            await new tagSchema(tag).save()
            resMsg.message="tag added successfully in mongoDB  !"
            console.log('tag added successfully in mongoDB  !')
            res.status(201).json(resMsg)
        } catch (error) {
            console.log(error.message)
            resMsg.message=error.message
            res.status(404).json(resMsg)
        }
},
getAllTags:async ()=> {
    console.log('get all tags !')
    return tasks= await tagSchema.find({})
},
deleteTagById:async (id)=>{
    await tagSchema.findByIdAndDelete(id)
    console.log('tag deleted successfully in mongoDB !')
},
updateTag:async (tag,id)=>{
    await tagSchema.findByIdAndUpdate({_id:id},tag)
    console.log('tag updated successfully in mongoDB !')
}
}