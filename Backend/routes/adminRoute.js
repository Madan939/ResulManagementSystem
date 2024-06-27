const express=require('express')
const userController=require('../controllers/adminController')
const test = require('../middleware/test')
const router=express.Router()
router.post('/adminRegister',userController.adminRegister)
router.post('/adminLogin',test,userController.adminLogin)
module.exports=router