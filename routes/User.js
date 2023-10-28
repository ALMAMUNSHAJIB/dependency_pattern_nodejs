const router = require('express').Router();
const {devDependcis} = require('../dependency/development');
const {prodDependcis} = require('../dependency/production');
const {parameterValidationRules, loginParameterValidationRules,  parameterValidation} = require('../validator/user/user');
const {createUser, SignUp} = require('../controller/user');

// Prod development
router.post('/prod/signIn', parameterValidationRules(), parameterValidation, createUser(prodDependcis));
router.post('/prod/signUp', loginParameterValidationRules(), parameterValidation, SignUp(prodDependcis));


// Dev development 
router.post('/test/signIn', parameterValidationRules(), parameterValidation, createUser(devDependcis));




module.exports = router;