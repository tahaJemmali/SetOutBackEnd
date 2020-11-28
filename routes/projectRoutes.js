const projectServie = require('../modules/project_module')
const var_dump = require('var_dump')
const tag = require('../entites/tag')

module.exports = {
//get all projects 
    getAllprojectsRoute:(res) =>{
    projectServie.getAllprojects().then(function (result) {
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
            projectServie.deleteprojectById(id)
            res.status(200).json("project deleted successfully !")
        } catch (error) {
            console.log(error)
        }
    },
//update project route
    updateprojectRoute:(id,reqBody,res)=>{
        try {
            var project = {
                projectName:reqBody.projectName,
                description:reqBody.description,
                dateCreation:reqBody.enjoyment,
                task:reqBody.task
            }
            projectServie.updateproject(project,id)
            res.status(200).json("project updated successfully !")
        } catch (error) {
            console.log(error)
        }
    }
}

