const {check, validationResult} = require('express-validator');

exports.profileParamterValidationRules = () => {
    return [
        check('tilte').isLength({
            min: 1
        }).withMessage('Invalid title'),
        check('desc').isLength({
            min: 1
        }).withMessage('Invalid desc'),
        check('userId').isLength({
            mis: 1
        }).withMessage('Invalid userId')
    ]
};

exports.profileParamterValiton = async(req, res, next) => {
    try {
        const input_error = validationResult(req);
        if(!input_error.isEmpty()){
            return res.status(422).json({
                status: 0,
                message: 'required field missing',
                error:  input_error.array()
            })
        }else{
            next();
        }
    } catch (error) {
        
    }
}