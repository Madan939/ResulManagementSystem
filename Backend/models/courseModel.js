const mongoose=require('mongoose')
const itemsSchema=new mongoose.Schema({
    coursename:{type:String,require:true},
    coursefee:{type:String,require:true},
},{timestamps:true})
const Course= new mongoose.model('course',itemsSchema)
module.exports=Course