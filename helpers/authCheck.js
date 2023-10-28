const jwt = require('jsonwebtoken');

exports.authCheck = async(req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization){
            return res.json({
                status: 0,
                message: 'something is worng authorization'
            })
        }
        const token = authorization.split("Bearer ")[1]
        const user = await verifyJwtToken(token);
         req.user = user;
         next();
        
    } catch (error) {
        console.log(error)
    }
}


const verifyJwtToken = async(token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
        
    } catch (error) {
        console.log(error);
    }
}