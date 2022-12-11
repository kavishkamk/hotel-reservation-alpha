const express = require("express");
const app= express();

app.get("/",function(request,response){
 response.send("Hello World");

});

app.listen(4000, function(){
  console.log("Server started on port 4000");
});
