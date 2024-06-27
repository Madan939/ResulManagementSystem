const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const itemsSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    verified: { type: Boolean, require: true }
}, { timestamps: true })
itemsSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
itemsSchema.methods.matchPassword = async function (enterpassword) {
    console.log("enter password", enterpassword)
    return await bcrypt.compare(enterpassword, this.password)
}
const Item = new mongoose.model('admin', itemsSchema)
module.exports = Item