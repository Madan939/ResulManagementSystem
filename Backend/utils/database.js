const mongoose=require('mongoose')
const url="mongodb://madantamang939:br3FzXObnBaQLFMn@ac-ndrwrza-shard-00-00.whjmso2.mongodb.net:27017,ac-ndrwrza-shard-00-01.whjmso2.mongodb.net:27017,ac-ndrwrza-shard-00-02.whjmso2.mongodb.net:27017/?replicaSet=atlas-t9szw6-shard-0&ssl=true&authSource=admin"
mongoose.connect(url);
const connectobj=mongoose.connection;
connectobj.on('connected',()=>{
    console.log("database connected successfully")
})
connectobj.on('error',(error)=>{
    console.log('connection error',error)
})
connectobj.on('disconnected',()=>{
    console.log("database disconnected")
})
process.on('SIGINT',async()=>{
    await mongoose.connection.close()
    process.exit(0)
})
module.exports=connectobj