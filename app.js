const express =require('express');
const app=express();
require("./database/connection");

app.use(express.json());
const blogRoutes=require('./routes/blog.route');
const userRoutes=require('./routes/user.route');

app.use('/',blogRoutes);
app.use('/',userRoutes);



app.listen(3001,()=>{
     console.log("Server is running on port 3001 ");
});