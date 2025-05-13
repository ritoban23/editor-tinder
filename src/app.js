const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "Virat",
        lastName: "Kohli",
        email: "virat@12gmail.com",
        password: "virat123",
    });

    try {
        await user.save();
        res.send("User created successfully");
    } catch (err) {
        res.status(400).send("error creating user" + err.message);
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



