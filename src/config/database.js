const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect(
    "mongodb+srv://ankudutt101:b3rSA5lcFDd4PMYq@namastenode.ynalqcv.mongodb.net/editorTinder"
    );
};

module.exports = connectDB;


