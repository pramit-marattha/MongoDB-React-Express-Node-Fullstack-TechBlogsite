const {check} = require("express-validator");

exports.createCategoryValidator = [
    check('name').not().isEmpty().withMessage("hold up!! Name is required")
];