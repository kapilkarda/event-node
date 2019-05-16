const {userRegister, userLogin, fetchSingleUser, updateUser } = require('../controllers/user');
const { check, validationResult } = require('express-validator/check');
const errorCheck = require('../middlewares/errorHandler');

module.exports.userRegisterMidlleware = [
    // username must be an email
      check('email').isEmail(),

    check('password').isLength({ min: 3 }),
  
    errorCheck.requestValidator
  ];
  
  
module.exports.register = (req,res, next) => {
    let emailLower = req.body.email.toLowerCase();
        req.body.email = emailLower;
    userRegister(req.body).then((responseData) => {
         res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.login = (req,res, next) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    userLogin(email, password).then((responseData) => {
         res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.fetchSingle = (req,res, next) => {
    const id = req.user.id;
    fetchSingleUser(id).then((responseData) => {
         res.json(responseData)
    }).catch((err) => next(err));
}

module.exports.update = (req,res, next) => {
    const id = req.user.id;
    const userUpdateData = req.body;
    updateUser(id, userUpdateData).then((responseData) => {
         res.json(responseData)
    }).catch((err) => next(err));
}