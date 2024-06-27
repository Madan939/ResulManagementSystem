const mongoose=require('mongoose')
const semesterSchema=new mongoose.Schema({
    course:{type:String,require:true},
    semester:{type:String,require:true},
    subjects:{type:Array,require:true},
},{timestamps:true})
const Semester= new mongoose.model('semester',semesterSchema)
module.exports=Semester