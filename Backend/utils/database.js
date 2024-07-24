const mongoose=require('mongoose');
const url=process.env.DATABASE;
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