import jwt from 'jsonwebtoken'

export const adminAuth = (req, res, next) => {

    try {
        
        const {token} = req.headers

        // normal token check
        if(!token){
            return res.json({
                success: false,
                message: "Not Authorized Login Again"
            })
        }

        //admin have token and gen. token verify
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

        if(token_decode  !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({
                success: false,
                message: "Not Authorized Login Again"
            })
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error in adminAuth"
        })
    }

}