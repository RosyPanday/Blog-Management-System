const express =require('express');
const app=express();
require("./database/connection")

app.get('/',);

app.listen(3001,()=>{
     console.log("Server is running on port 3001 ");
});