const User = require("../models/user-models")

const register = async (req, res) => {
    try{
        let user = await User.findOne({email: req.body.email})

        if(user){
            return res.status(200).send("Email exist")
        }
        user = await User.create(req.body)
        return res.status(200).send(user)
    }catch(error){
        return res.status(500).send(err)
    }
}

const login = async (req, res) => {
    try{
        const user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(200).send("Logged in")
        }
        return res.status(200).send("Incorrect email or password")
    }catch(error){
        return res.status(500).send(error)
    }
}

module.exports = {register, login}