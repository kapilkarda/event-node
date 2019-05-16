const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema =  mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true     
    }
},{
    timestamps: true
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function(passw, pwd, cb) {

    bcrypt.compare(passw, this.password, function(err, isMatch) {
        if (err) {
            return err;
        }
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('User', UserSchema);


