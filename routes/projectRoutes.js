const projectServie = require('../modules/project_module')

module.exports = {
//get all projects 
    getAllprojectsRoute:(res,userid) =>{
    projectServie.getAllprojects(userid).then(function (result) {
    res.status(200).json({
        message:"all projects",
        projects:result})
    })
},
//add tak
    addprojectRoute:(req,res)=>{
        try {
            projectServie.addproject(req,res)
        } catch (error) {
            console.log(error);
        }
       
        
    },
//delete project route
    deleteprojectRoute: (id,res)=>{
        try {

            projectServie.deleteprojectById(id,res)

        } catch (error) {
            console.log(error)
        }
    },
//update project route
    updateprojectRoute:(id,reqBody,res)=>{
        try {
            projectServie.updateproject(reqBody,id,res)
        } catch (error) {
            console.log(error)
        }
    }
}

