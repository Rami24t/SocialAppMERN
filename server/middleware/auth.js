import jwt from "jsonwebtoken"
export default function auth(req, res, next) {
    try {
        const token = req.cookies['SocialAppMERNToken']
        const dercrypted = jwt.verify(token, process.env.JWT_SECRET)
        req.user = dercrypted.id
        next()        
    } catch (error) {
        console.log("Error: ", error.message)
        res.send({success: false, error: error.message})
    }
}
