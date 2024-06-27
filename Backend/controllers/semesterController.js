const Semestermodel = require('../models/semesterModel')
exports.addsemester = async (req, res) => {
    console.log(req.body)
    try {
        const newSemester = new Semestermodel(req.body)
        await newSemester.save()
        res.status(200).json({
            message: 'Semester Added successfully'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }

}
exports.showsemester = async (req, res) => {
    try {
        const semesterlist = await Semestermodel.find()
        res.send(semesterlist)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
exports.editsemester = async (req, res) => {
    // console.log(req.params._id)
    try {
        const id = req.params._id
        const semester = await Semestermodel.findById(id)
        //console.log(semester)
        if (semester) {
            res.send(semester)
        }
        else {
            console.log("error")
        }
    }
    catch (err) {
        res.status(400).json(err)
    }

}
exports.updatesemester = async (req, res) => {
   // console.log(req.body)
    const id = req.body._id
    const {course,semester,subjects} = req.body
    try {
        await Semestermodel.findByIdAndUpdate(id, {
            course,semester,subjects
        })
        res.status(200).json({
            message: ' updated successfully'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }

}
exports.deletesemester = async (req, res) => {
    const id = req.params._id
   // console.log(id)
    try {
        await Semestermodel.findByIdAndDelete(id)
        res.status(200).json({
            message: ' deleted successfully'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }
}