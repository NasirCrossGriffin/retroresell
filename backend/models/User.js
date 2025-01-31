//STEP 1 import Mongoose
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true, minLength: 6},
        image: {type: String, required: true}
    }
)

module.exports = mongoose.model('User', userSchema);

