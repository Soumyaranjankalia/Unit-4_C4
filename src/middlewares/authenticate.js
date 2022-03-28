require("dotenv").config();
const jwt = require("jsonwebtoken")

const verifyToken=(token) => {
    return new Promise((resole,reject)=>{
        jwt.verify(token,process.env.SECRET_KEY, (err,decoded)=>{
            if(err) return reject(err)

            return resolve(decoded)
        })
    })
}

const authenticate = async = async (req, res, next) =>{
    if(!req.headers.authorization)
    return res.status(400).send({messaage: "Token not found"})

    if(!req.headers.authorization.startsWith("Bearer"))
    return res.status(400).send({message:"Token not found"})

    const token = req.headers.authorization.trim().split(" ")[1]

    let decoded;
    try{
        decoded = await verifyToken(token)
    }
    catch(err){
        console.log(err)
        return res.status(400).send({message:"token not found"})
    }
    console.log(decoded)

    req.userID = decoded.user._id

    return next()
}

module.exports= authenticate