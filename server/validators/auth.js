const {check} = require("express-validator");

exports.userSignupValidator = [
    check('name').not().isEmpty().withMessage("hold up!! Name is required"),
    check('email').isEmail().withMessage("Please enter valid email address"),
    check('password').isLength({min:6}).withMessage("password must be 6 characters"),
];

exports.userLoginValidator = [
    check('email').isEmail().withMessage("Please enter valid email address"),
    check('password').isLength({min:6}).withMessage("password must be 6 characters"),
];

