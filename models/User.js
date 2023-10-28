const {Schema, model} = require('mongoose');


const UserSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        isEmail: true
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    token: {
        type: String
    }
},
{
    timestamp: true
}
);


exports.TestUser = model('test-user', UserSchema);
exports.User = model('User', UserSchema);
