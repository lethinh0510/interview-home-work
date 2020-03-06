const { check, validationResult } = require('express-validator');
exports.UserValidator = function(req, res, next){
    req.check('name', 'Name is required.').notEmpty();
    req.check('email', 'Invalid email.').isEmail();
    req.check('email', 'Email is required.').notEmpty();
    req.check('password', 'Password is required.').notEmpty();
    req.check('password', 'Password must be more than 6 characters').isLength({min:6});
    const errors = req.validationErrors();
    if(errors){
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();
}