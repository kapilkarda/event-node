const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports.userRegister = (userInfo) => {
    return new Promise((resolve, reject) => {
        new User(userInfo).save()
        .then((saveInfo) => {
            const responseData = {
                            
                'success': true,
                'message': "login successful",
                'data': saveInfo

            }
            resolve(responseData);
        }).catch((err) => reject(err));
    });
};

module.exports.userLogin = (email, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({email: email})
        .then((userFound) => {
            if(userFound){
                userFound.comparePassword(password, userFound.password, (err, isMatch) => {
                    if (err) {
                        const responseData = {
                            success: false,
                            msg: 'Something is wrong',
                        }
                        resolve(responseData);
                    }
                    if (isMatch) {

                       /* User.findOneAndUpdate({
                            _id: userFound._id
                        }, {

                            '$set': {

                                'deviceType': deviceType,
                                'deviceId': deviceId
                            }
                        }, {
                            'new': true
                        }).then((N) => {
                            console.log("N=" + N)
                        }).catch((error) => reject(error))*/


                        const token = jwt.sign({
                                id: userFound._id,
                                email: userFound.email
                            },
                            process.env.JWT_SECRET_KEY, {
                                expiresIn: "365d"
                            });

                        const responseData = {
                            'success': true,
                            'message': "Login successful",
                             'token': token,
                            'data': userFound }

                        resolve(responseData);
                    } else {
                        const responseData = {
                            'success': false,
                            'message': "Password incorrect"
                            
                        }
                        resolve(responseData);
                    }
                });
            } else{
                resolve({ 'success': false, 'message': 'Couldnt find your Account'});
            }
            // resolve(saveInfo)
        }).catch((err) => reject(err));
    });
};

module.exports.fetchSingleUser = (id) => {
    return new Promise((resolve, reject) => {
        User.findOne({_id: id})
        .then((fetchUser) => {
            const responseData = {
                'success': true,
                'data': fetchUser
            }
            resolve(responseData);
        }).catch((err) => reject(err));
    });
};

module.exports.updateUser = (id, data) => {
    return new Promise((resolve, reject) => {
        User.findOneAndUpdate({_id: id}, {'$set':data},{'new':true})
        .then((update) => {
            const responseData = {
                'success': true,
                'data': update
            }
            resolve(responseData);
        }).catch((err) => reject(err));
    });
};