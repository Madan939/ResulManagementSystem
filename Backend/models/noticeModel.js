const mongoose=require('mongoose')
const noticeSchema=new mongoose.Schema({
    issuername:{type:String,require:true},
    post:{type:String,require:true},
    notice:{type:String,require:true},
},{timestamps:true})
const Notice= new mongoose.model('notice',noticeSchema)
module.exports=Notice