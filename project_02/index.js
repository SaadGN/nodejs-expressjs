const express = require('express')

const {connectMongoDB} = require('./connection')

const userRouter = require("./routes/user")

const {logReqRes} = require('./middleware')

const app = express()
const port = 8000




//connection
connectMongoDB('mongodb+srv://test:%23pakistan123@project1.78ta2fh.mongodb.net/project1')
.then( () => console.log("MongoDB Connected"))


// mongoose
//     .connect('mongodb+srv://test:%23pakistan123@project1.78ta2fh.mongodb.net/project1')
//     .then(() => {
//             console.log("MongoDB Connected")
//     })
//     .catch((err) => {
//             console.log("Err: ", err)
//     })



//MiddleWare
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes('log.txt'))



//routes
app.use('/api/users',userRouter)


app.listen(port, () => console.log('Project Server Started!!!'))