const express=require('express');
const userController=require('../controllers/adminController');
const test = require('../middleware/test');
const router=express.Router();
router.post('/adminRegister',userController.adminRegister);
router.post('/adminLogin',test,userController.adminLogin);
router.get('/verifyEmail/:token',userController.verifyEmail);
router.post('/forgetPassword',userController.forgetPassword);
router.post('/resetPassword',userController.resetPassword);
router.get('/getUser',userController.getUser)
router.post('/updateRole',userController.updateRole)
module.exports=router