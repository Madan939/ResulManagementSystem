const express = require('express');
const dbconnect=require('./utils/database')
const AdminRoute=require('./routes/adminRoute')
const CourseRoute=require('./routes/courseRoute')
const SemesterRoute=require('./routes/semesterRoute')
const NoticeRoute=require('./routes/noticeRoute')
const StudentRoute=require('./routes/studentRoute')
const ResultRoute=require('./routes/resultRoute')
const app=express()
const cors=require('cors')
app.use(express.json())
app.use(cors())
app.use('/api/admin',AdminRoute)
app.use('/api/course',CourseRoute)
app.use('/api/semester',SemesterRoute)
app.use('/api/notice',NoticeRoute)
app.use('/api/student',StudentRoute)
 app.use('/api/result',ResultRoute)
const port=8000
app.listen(port,()=>{
  console.log(`server is running in ${port}`)
})
// mongodb://madantamang939:VJiXoJebkMRcn31z@ac-ndrwrza-shard-00-00.whjmso2.mongodb.net:27017,ac-ndrwrza-shard-00-01.whjmso2.mongodb.net:27017,ac-ndrwrza-shard-00-02.whjmso2.mongodb.net:27017/?replicaSet=atlas-t9szw6-shard-0&ssl=true&authSource=admin