const express = require("express");
const app = express();

app.get("/app/payment",function(req,res){
  res.send("Hello World");
});
app.listen(4000,function(){
  console.log("Server is running on port 4000");
});
app.get('/getRequest',function(req,res){
  res.send("This is get method")
});

app.post('/postRequest',function(req,res){
  res.send("This is post method")
});
