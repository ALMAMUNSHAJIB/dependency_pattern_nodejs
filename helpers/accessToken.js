const jwt = require('jsonwebtoken');

exports.accessToken = async( payload, expiresIn = '1h' ) => {
     try {
         const token = await jwt.sign(payload, process.env.JWT_SECRET, {
             expiresIn: expiresIn
         });

         return token;
        
     } catch (error) {
        
     }
}