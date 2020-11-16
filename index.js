const mongo = require('./mongo')
const taskSchema = require('./entites/task')

const connectToMongoDB = async () =>{
    await mongo().then(async (mongoose)=>{
        try {
            console.log('Connected to mongoDB !')


            const task = {
                taskName: 'fahd'
            }

            await new taskSchema(task).save()


        } catch (error) {
            console.log('ERROR : Connection to mongoDB failed.')
        }finally{
            mongoose.connection.close()
        }
    })
}

connectToMongoDB()