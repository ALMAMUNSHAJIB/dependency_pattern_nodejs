const {check, validationResult} = require('express-validator');


exports.parameterValidationRules = ()=>{
    return [
        check('name').isLength({
            min: 1
        }).withMessage('Invalid name'),
        check('email').isLength({
            min: 1
        }).isEmail().withMessage('Invalid email'),
        check('password').isLength({
            min: 7
        }).withMessage('Invalid password')
    ]
};

exports.loginParameterValidationRules = () => {
    return [
        check('email').isEmail().withMessage('Invalid email'),
        check('password').isLength({
            min: 7
        }).withMessage('Invalid password')
    ]
}



exports.parameterValidation = async(req, res, next) => {
    try {
        const input_error = validationResult(req);
        if(!input_error.isEmpty()){

            return res.status(200).json({
                status: 0,
                message: 'required field missing',
                error: input_error.array()
            })

        }else{
            next()
        }
    } catch (error) {
        
    }
};