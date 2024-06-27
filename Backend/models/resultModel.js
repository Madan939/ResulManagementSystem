const mongoose=require('mongoose')
const ResultSchema=new mongoose.Schema({
    name:{type:String,require:true},
    symbolno:{type:String,require:true},
    grade:{type:String,require:true},
    faculty:{type:String,require:true},
    semesteryear:{type:String,require:true},
    subjects:{type:Array,require:true},
},{timestamps:true})
const Result= new mongoose.model('result',ResultSchema)
module.exports=Result