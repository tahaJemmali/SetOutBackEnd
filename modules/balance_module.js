const e = require('express')
const balanceSchema = require('../entites/balance')
var resMsg = {
    message:String
}
module.exports = {
    addbalance: async (req,res) => {

        try {
            await new balanceSchema(req.body).save()
            resMsg.message="balance added successfully in mongoDB  !"
            console.log('balance added successfully in mongoDB  !')
            res.status(201).json(resMsg)
        } catch (error) {
            console.log(error.message)
            resMsg.message=error.message
            res.status(404).json(resMsg)
        }
},
getAllbalances:async (userid)=> {
    console.log('get all balances !')
    return balances= await balanceSchema.find({user:userid}).populate("tasks").populate("tag")
},
getAllSchedules:async (userid)=> {
    return balances= await balanceSchema.find({user:userid,schedule:true})
},
deletebalanceById:async (id,res)=>{
    try {
        await balanceSchema.findByIdAndDelete(id)
        resMsg.message="balance deleted successfully in mongoDB  !"
        res.status(201).json(resMsg)
    } catch (error) {
        console.log(error.message)
        resMsg.message=error.message
        res.status(404).json(resMsg)
    }
    
    console.log('balance deleted successfully in mongoDB !')
},
updatebalance:async (balance,id)=>{
    await balanceSchema.findByIdAndUpdate({_id:id},balance)
    console.log('balance updated successfully in mongoDB !')
}
}