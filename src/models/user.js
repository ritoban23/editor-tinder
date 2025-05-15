const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

userSchema.methods.getJWT = async function (){

    const user = this;
    const token = await jwt.sign({ _id : user._id},"Editor@tinder$99",{expiresIn: "7d"});
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isMatch = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isMatch;
}

const User = mongoose.model("user", userSchema);
module.exports = User;