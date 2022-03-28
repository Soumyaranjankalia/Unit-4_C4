const express = require("express")

const router = express.Router()

const authenticate = require("../middlewares/authenticate")
const Todomodel = require("../models/todo-model")

router.post("", authenticate, async(req, res) => {
    req.body.user_id = req.userID;
    try{
        const todo = await Todomodel.create(req.body)
        return res.status(200).send(todo)
    }catch(err){
        return res.status(400).send({message: err.message})
    }
})

router.get("", async (req, res) => {
    try{
        const todo = await Todomodel.find()
        return res.status(200).send(todo)
    }catch(err){
        return res.status(400).send({message: err.message})
    }
})

router.patch("/:id", authenticate, async(req,res) =>{
    try{
        const todo = await Todomodel.findByIdAndUpdate(req.params.id, req.body,{new:true})
        return res.status(200).send(todo)
    }catch(err){
        return res.status(400).send({message: err.message})
    }
})

router.delete("./id",authenticate, async(req,res)=>{
    try{
        const todo = await Todomodel.findByIdAndDelete(req.params.id)
        return res.status(200).send(todo)
    }catch(err){
        return res.status(400).send({message: err.message})
    }
})

module.exports = router