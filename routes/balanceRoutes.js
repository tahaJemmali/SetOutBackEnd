const balanceServie = require('../modules/balance_module')

module.exports = {
//get all balances 
    getAllbalancesRoute:(res) =>{
    balanceServie.getAllbalances().then(function (result) {
    res.status(200).json({
        message:"all balances",
        balances:result})
    })
},
//add tak
    addbalanceRoute:(req,res)=>{
        try {
            balanceServie.addbalance(req,res)
        } catch (error) {
            console.log(error);
        }
       
        
    },
//delete balance route
    deletebalanceRoute: (id,res)=>{
        try {
            balanceServie.deletebalanceById(id,res)
        } catch (error) {
            console.log(error)
        }
    },
//update balance route
    updatebalanceRoute:(id,reqBody,res)=>{
        try {
            var balance = {
                balanceName:reqBody.balanceName,
                balanceAmount:reqBody.balanceAmount,
                dateCreation:reqBody.dateCreation,
                type:reqBody.type
            }
            balanceServie.updatebalance(balance,id)
            res.status(200).json("balance updated successfully !")
        } catch (error) {
            console.log(error)
        }
    }
}

