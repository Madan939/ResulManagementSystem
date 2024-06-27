const express=require('express')
const semesterController=require('../controllers/semesterController')
const router=express.Router()
router.post('/add-semester',semesterController.addsemester)
router.get('/show-semester',semesterController.showsemester)
router.get('/edit-semester/:_id',semesterController.editsemester)
router.post('/update-semester',semesterController.updatesemester)
 router.post('/delete-semester/:_id',semesterController.deletesemester)
module.exports=router