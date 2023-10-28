const bcrypt = require('bcrypt');
const {accessToken} = require('../helpers/accessToken');

exports.createUser = ({User}) => {
    return(async(req, res, next) => {
        try {
            const {name, email, password} = req.body;
            const exitEmail = await User.findOne({email: email});
            if(exitEmail){
                return res.json({
                    status: 1,
                    message: 'User already registerd'
                })
            }
            const saltRunds = bcrypt.genSaltSync(10)
            const hasPass =  bcrypt.hashSync(password, saltRunds);
            if(!hasPass){
                return res.json({
                    status: 0,
                    message: 'Hash password not genraterd'
                })
            }
            const newUser = await new User({
                name, email, password: hasPass
            });

            await newUser.save();
            return res.status(200).json({
                status: 1,
                message: 'Successfully register user',
                data: newUser
            })

            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 0,
                message: 'Invalid register' + error
            })
            
        }
    })
};


exports.SignUp = ({User}) => {
    return (async(req, res, next) => {
     
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.json({
                    status: 0,
                    message: 'User not found!'
                })
            }

            const isPassword = bcrypt.compareSync(password, user.password);
            if(!isPassword){
                return res.json({
                    status: 0,
                    message: 'credentials not match'
                })
            }

            let payload = {
                name: user.name,
                email: user.email
            }

            const token = await accessToken(payload);
            if(!token){
                return res.json({
                    status: 0,
                    message: 'token generate failed'
                })
            }

            const updateUser = await User.findOneAndUpdate({email: email}, {token: token});
            if (!updateUser) {
                return res.json({
                    status: 0,
                    message: 'Token update failed'
                })
            }

            return res.status(200).json({
                status: 1,
                message: 'Success token',
                access_token: token
            })

        } catch (error) {
            return res.json({
                status: 0,
                message: 'Login failed' + error,
            })
        }
        
    })
};