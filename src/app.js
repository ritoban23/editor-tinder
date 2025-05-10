const express = require('express');

const app = express();

app.use("/test", (req,res) => {
    res.send("hello from 7777 test ");
});

app.use((req,res) => {
    res.send("hello from 7777 ");
});    


app.listen(7777, () => {
  console.log('Server is running on port 7777');
});

