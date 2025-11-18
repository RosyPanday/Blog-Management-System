const express =require('express');
const app=express();
require("./database/connection");

app.use(express.json());
const blogRoutes=require('./routes/blog.route');

app.get('/',blogRoutes);

app.listen(3001,()=>{
     console.log("Server is running on port 3001 ");
});