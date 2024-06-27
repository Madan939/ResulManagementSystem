const Noticemodel = require('../models/noticeModel')
exports.addnotice = async (req, res) => {
   // console.log(req.body)
    try {
        const newNotice = new Noticemodel(req.body)
        await newNotice.save()
        res.status(200).json({
            message: 'Notice added successfully'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }

}
exports.shownotice = async (req, res) => {
    try {

        const noticelist = await Noticemodel.find({}).sort({createdAt:-1})
        res.send(noticelist)
    }
    catch (err) {
        res.status(400).json(err)
    }
}
exports.editnotice = async (req, res) => {
    // console.log(req.params._id)
    try {
        const id = req.params._id
        const notice = await Noticemodel.findById(id)
        //console.log(notice)
        if (notice) {
            res.send(notice)
        }
        else {
            console.log("error")
        }
    }
    catch (err) {
        res.status(400).json(err)
    }

}
exports.updatenotice = async (req, res) => {
    const id = req.body._id
    // console.log(id)
    const { issuername,post,notice } = req.body
    try {
        await Noticemodel.findByIdAndUpdate(id, {
            issuername,post,notice
        })
        res.status(200).json({
            message: 'updated successfully'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }

}
exports.deletenotice = async (req, res) => {

    const id = req.params._id
    console.log(id)
    try {
        await Noticemodel.findByIdAndDelete(id)
        res.status(200).json({
            message: 'notice deleted successfully'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }
}