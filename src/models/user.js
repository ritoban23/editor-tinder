const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid  "+value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Password is weak  "+value);
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","Female","others"].includes(value)){
                throw new Error("Gender data is invalid");

            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.w3schools.com/howto/img_avatar.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Photo URL is invalid"+value);
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about me",
    },
    skills: {
        type: [String],
        default: [],
    },
},{timestamps: true});

const User = mongoose.model("user", userSchema);
module.exports = User;