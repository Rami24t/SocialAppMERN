import jwt from "jsonwebtoken"
export default function auth(req, res, next) {
    try {
        const token = req.cookies['SocialAppMERNToken']
        const dercrypted = jwt.verify(token, process.env.JWT_SECRET)
        req.user = dercrypted.id
        next()        
    } catch (error) {
        if(error.message === "jwt expired")
            res.json({success: false, error: "Session expired, please login again"}).status(401)
        else if(error.message === "invalid token")
            res.json({success: false, error: "Invalid token, please login again"}).status(401)
        else
            res.json({success: false, error: "Something went wrong, please login again"}).status(401)
        console.log(error.message);
    }
}
