const {Schema, model, Types} = require('mongoose');

const profileSchema = Schema({
    tilte: {
        type: String,
        require: true,
        trim: true
    },
    desc: {
       type: String,
       require: true
    },
    fileName: {
        type: String,
        require: true
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});



exports.Profile = model('Profile', profileSchema)