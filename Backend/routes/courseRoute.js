const express=require('express')
const courseController=require('../controllers/courseController')
const router=express.Router()
router.post('/add-course',courseController.addcourse)
router.get('/show-course',courseController.showcourse)
router.get('/edit-course/:_id',courseController.editcourse)
router.post('/update-course',courseController.updatecourse)
router.post('/delete-course/:_id',courseController.deletecourse)
module.exports=router