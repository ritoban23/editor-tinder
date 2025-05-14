const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

//create user(signup)
app.post("/signup", async (req, res) => {
    try {
        const {password,firstName,lastName,email,age,gender} = req.body;
        //validate user data
        validateSignupData(req);

        //encrypt password
        const passwordHash = await bcrypt.hash(password,10);
        
        //create new instance of user model
        const user = new User({
            firstName,
            lastName,
            email,
            password : passwordHash,
            age,
            gender,
        } );

        await user.save();
        res.send("User created successfully");
    } catch (err) {
        res.status(400).send("error creating user" + err.message);
    }
});

//login user
app.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;
        //find user by email
        const user = await User.findOne({ email : email });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.send("Login successful");
        }
        else {
            throw new Error("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

//get user by email(login)
app.get("/user", async (req, res) => {
    const userEmail = req.body.email;

    try {
        const users = await User.find({ email: userEmail });
        if (users.length === 0) {
            res.status(404).send("User not found");
        }
        else {
            res.send(users);
        }
    } catch (err) {
        res.status(400).send("something went wrong");
    }
});

//get all users
app.get("/feed", async (req, res) => {

    try {
        const users = await User.find({ });
        res.send(users);
    } catch (err) {
        res.status(400).send("something went wrong");
    }
});

//delete user from database
app.delete("/user", async (req,res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send("User deleted successfully");
        }
    } catch (err) {
        res.status(400).send("something went wrong");
    }
});

//update user
app.patch("/user", async (req,res) => {
    const userId = req.body.userId;
    const updateData = req.body;

    try { 
        const user = await User.findByIdAndUpdate(userId, updateData,{returnDocument: "after", runValidators: true});
        if (!user) {
            res.status(404).send("User not found");
        } else {
            res.send("User updated successfully");
        }
    } catch (err) {
        res.status(400).send("something went wrong");
    }
});
    

connectDB()
    .then(() => {
        console.log("Database connection established");
        app.listen(7777, () => {
            console.log("Server is running on port 7777");
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected");
    });



