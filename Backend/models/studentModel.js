const mongoose=require('mongoose')
const studentSchema=new mongoose.Schema({
    name:{type:String,require:true},
    symbolno:{type:String,require:true},
    address:{type:String,require:true},
    phone:{type:String,require:true},
    gender:{type:String,require:true},
    grade:{type:String,require:true},
    faculty:{type:String,require:true},
    semesteryear:{type:String,require:true},
    dob:{type:Date,require:true},
},{timestamps:true})
const Student= new mongoose.model('student',studentSchema)
module.exports=Student