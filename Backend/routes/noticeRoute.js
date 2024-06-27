const express=require('express')
const noticeController=require('../controllers/noticeController')
const router=express.Router()
router.post('/add-notice',noticeController.addnotice)
router.get('/show-notice',noticeController.shownotice)
router.get('/edit-notice/:_id',noticeController.editnotice)
router.post('/update-notice',noticeController.updatenotice)
router.post('/delete-notice/:_id',noticeController.deletenotice)
module.exports=router