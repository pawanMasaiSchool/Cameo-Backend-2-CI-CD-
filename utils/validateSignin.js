const {body}= require('express-validator')
const validateSignin= ()=>[body("email").not().isEmpty().withMessage("Email should not be empty").isString().withMessage("Email should be a string"),
body("password").not().isEmpty().withMessage("Password should not be empty").isLength({min:8}).withMessage("Password should have at least 8 characters").isString().withMessage('Password should be a string')
]

module.exports=validateSignin