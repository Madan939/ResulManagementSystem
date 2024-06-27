const Studentmodel = require('../models/studentModel')
exports.addstudent = async (req, res) => {
    //console.log(req.body)
    try {
        const newstudent = new Studentmodel(req.body)
        await newstudent.save()
        res.status(200).json({
            message: 'Added successfully'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }
}
exports.showstudent = async (req, res) => {
    try {
        const studentlist = await Studentmodel.find()
        res.send(studentlist)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
exports.viewstudent = async (req, res) => {
    const id=req.params._id
    try {
        const student = await Studentmodel.findById(id)
        if(student){
            res.send(student)
        }
        else {
            console.log("error")
        }
        
    }
    catch (err) {
        res.status(400).json(err)
    }
}
exports.editstudent = async (req, res) => {
    // console.log(req.params._id)
    try {
        const id = req.params._id
        const student = await Studentmodel.findById(id)
        if (student) {
            res.send(student)
        }
        else {
            console.log("error")
        }
    }
    catch (err) {
        res.status(400).json(err)
    }

}
exports.updatestudent = async (req, res) => {
   //console.log(req.body)
    const id = req.body._id
     //console.log(id)
    const {name,symbolno,address,grade,faculty,semesteryear,dob,gender,phone} = req.body
    try {
        await Studentmodel.findByIdAndUpdate(id, {
            name,symbolno,address,grade,faculty,semesteryear,dob,gender,phone
        })
        res.status(200).json({
            message: ' updated successfully'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }

}
exports.deletestudent = async (req, res) => {
    const id = req.params._id
   // console.log(id)
    try {
        await Studentmodel.findByIdAndDelete(id)
        res.status(200).json({
            message: ' deleted successfully'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }
}
exports.searchstudent = async (req, res) => {
    const name=req.body.name
   //console.log(name)
    try {
        const student = await Studentmodel.find({name:{ $regex: new RegExp(name, 'i') }})
       // console.log(student)
        if(student){
            res.send(student)
        }
        else {
            console.log("error")
        }
        
   }
    catch (err) {
        res.status(400).json(err)
    }
}