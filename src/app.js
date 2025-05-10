const express = require('express');

const app = express();

app.use("/user/:userid/:name/:password", (req,res) => {
    console.log(req.params);
    res.send({firstName: "rito" , lastName: "dutta"});
});

app.use((req,res) => {
    res.send("hello from 7777 ");
});    


app.listen(7777, () => {
  console.log('Server is running on port 7777');
});

