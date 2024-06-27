const Resultmodel = require('../models/resultModel')
exports.addresult = async (req, res) => {
    //console.log(req.body)
    try {
        const newResult = new Resultmodel(req.body)
        await newResult.save()
        res.status(200).json({
            message: 'Added successfully'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }
}
exports.showresult = async (req, res) => {
    try {
        const resultlist = await Resultmodel.find()
        res.send(resultlist)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
exports.viewresult = async (req, res) => {
    const id=req.params._id
    try {
        const result = await Resultmodel.findById(id)
        if(result){
            res.send(result)
        }
        else {
            console.log("error")
        }
        
    }
    catch (err) {
        res.status(400).json(err)
    }
}
exports.searchresult = async (req, res) => {
    const name=req.body.symbolno
   // console.log(name)
    try {
        const result = await Resultmodel.findOne({ symbolno:name })
       // console.log(result)
        if(result){
            res.send(result)
        }
        else {
            res.status(400).json({
                message: 'login failed'
            })
        }    
    }
    catch (err) {
        res.status(400).json(err)
    }
}
exports.editresult = async (req, res) => {
    // console.log(req.params._id)
    try {
        const id = req.params._id
        const result = await Resultmodel.findById(id)
        if (result) {
            res.send(result)
        }
        else {
            console.log("error")
        }
    }
    catch (err) {
        res.status(400).json(err)
    }

}
exports.updateresult = async (req, res) => {
   //console.log(req.body)
    const id = req.body._id
     //console.log(id)
    const {name,symbolno,grade,faculty,semesteryear,subjects} = req.body
    try {
        await Resultmodel.findByIdAndUpdate(id, {
            name,symbolno,grade,faculty,semesteryear,subjects
        })
        res.status(200).json({
            message: ' updated successfully'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }

}
exports.deleteresult = async (req, res) => {
    const id = req.params._id
   //console.log(id)
    try {
        await Resultmodel.findByIdAndDelete(id)
        res.status(200).json({
            message: ' deleted successfully'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }
}