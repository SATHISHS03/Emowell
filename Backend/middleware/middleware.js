import JWT_TOKEN from "../config.js";
import Jwt  from "jsonwebtoken";



export default function authmiddleware(req, res, next) {
    // taking out authorization from headers
    const authHeader = req.headers.authorization
    console.log("headers",authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message : " token not found"
        })
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = Jwt.verify(token,JWT_TOKEN)
        console.log(decoded)
        req.userId = decoded.UserId
        console.log(req.userId)
        next()
    }
    catch (err) {
        return res.status(403).json({message: "User not found"})
    }

        
}