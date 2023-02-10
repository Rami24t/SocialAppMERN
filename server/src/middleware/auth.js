import jwt from "jsonwebtoken"
export default function auth(req, res, next) {
    try {
        const token = req.cookies['SocialAppMERNToken']
        const dercrypted = jwt.verify(token, process.env.JWT_SECRET)
        req.user = dercrypted.id
        next()        
    } catch (error) {
        if(error.message === "jwt expired")
            res.status(401).json({success: false, error: "Session expired, please login again"})
        else if(error.message === "invalid token")
            res.status(401).json({success: false, error: "Invalid token, please login again"})
        else
            res.status(401).json({success: false, error: "Something went wrong, please login again"})
        console.log(error.message);
    }
}
