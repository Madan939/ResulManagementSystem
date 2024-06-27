const Coursemodel = require('../models/courseModel')
exports.addcourse = async (req, res) => {
    //console.log(req.body)
    try {
        const newCourse = new Coursemodel(req.body)
        await newCourse.save()
        res.status(200).json({
            message: 'Course Added successfully'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }

}
exports.showcourse = async (req, res) => {
    try {
        const courselist = await Coursemodel.find()
        res.send(courselist)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
exports.editcourse = async (req, res) => {
    // console.log(req.params._id)
    try {
        const id = req.params._id
        const course = await Coursemodel.findById(id)
        //console.log(course)
        if (course) {
            res.send(course)
        }
        else {
            console.log("error")
        }
    }
    catch (err) {
        res.status(400).json(err)
    }

}
exports.updatecourse = async (req, res) => {
    const id = req.body._id
    const { coursename, coursefee } = req.body
    try {
        await Coursemodel.findByIdAndUpdate(id, {
            coursename, coursefee
        })
        res.status(200).json({
            message: 'Course updated successfully'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }

}
exports.deletecourse = async (req, res) => {

    const id = req.params._id
    //console.log(id)
    try {
        await Coursemodel.findByIdAndDelete(id)
        res.status(200).json({
            message: 'Course deleted successfully'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }
}