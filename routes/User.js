const router = require('express').Router();
const {devDependcis} = require('../dependency/development');
const {prodDependcis, profileProdDependcis} = require('../dependency/production');
const {parameterValidationRules, loginParameterValidationRules,  parameterValidation} = require('../validator/user/user');
const {createUser, SignUp, userProfile} = require('../controller/user');
const {upload} = require('../helpers/fileUpload');
const {profileParamterValidationRules, profileParamterValiton} = require('../validator/user/profile');
const {authCheck} = require('../helpers/authCheck');



// Prod development
router.post('/prod/signIn', parameterValidationRules(), parameterValidation, createUser(prodDependcis));
router.post('/prod/signUp', loginParameterValidationRules(), parameterValidation, SignUp(prodDependcis));
router.post('/prod/profile', authCheck, upload.single('file'), profileParamterValidationRules(), profileParamterValiton, userProfile(profileProdDependcis) )


// Dev development 
router.post('/test/signIn', parameterValidationRules(), parameterValidation, createUser(devDependcis));




module.exports = router;