const {check} = require("express-validator");

exports.createTagValidator = [
    check('name').not().isEmpty().withMessage("hold up!! Name is required")
];