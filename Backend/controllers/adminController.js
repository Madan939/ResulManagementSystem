const Adminmodel = require('../models/adminModel')
exports.adminRegister = async (req, res) => {
    try {
        const newUser = new Adminmodel({ ...req.body, verified: false })
        await newUser.save()
        res.status(200).json({
            message: 'registered succesfully, wait for verification'
        })
    }
    catch (err) {
        res.status(400).json(err)
    }

}
exports.adminLogin = async (req, res) => {
    try {
        const admin = await Adminmodel.findOne({
            email: req.body.email,
          //  password: req.body.password,
            verified: true

        })
        if (admin && await admin.matchPassword(req.body.password)) {
            res.status(200).json({
                message: 'login succesfully',
                admin: admin
            })
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