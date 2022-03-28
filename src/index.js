const express = require("express")
const app = express()
const connect = require("./configs/db")
const userController = require("./controller/user-controller")
const todoController = require("./controller/todo-controller")
const {register, login} = require("./controller/auth-controller")

app.use(express.json())
app.use("/user", userController)
app.post("/register", register)
app.post("/login", login)

app.use("/todo", todoController)



app.listen(4000, async() => {
    try{
        await connect()
        console.log("connecting to the PORT 4000")
    }
    catch(err){
        console.log("Error")
    }
})