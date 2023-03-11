
const { body, validationResult } = require('express-validator')

exports.checkEmail = [
    body('email').isEmail().withMessage("Invalid email address. Please try again.")
]

exports.checkAuth = [
    body('email').isEmail().withMessage("Invalid email address. Please try again."),
    body('password').isStrongPassword({
        minLength:6,
        minLowercase:1,
        minUppercase:1,
        minNumbers:1,
        minSymbols:1,
        returnScore:false
    }).withMessage("Invalid Password. Please try again")
]

exports.validation = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).send({errors: errors.array()})
    }
    next();
}