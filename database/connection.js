const {Sequelize,DataTypes} =require('sequelize');

require('dotenv').config();
const CONNECTION_STRING= process.env.CONNECTION_STRING;
const sequelize = new Sequelize(CONNECTION_STRING);

const blogs=require('./models/blog.Model');
const users=require('./models/user.Model');

sequelize.authenticate()
.then(()=>{
    console.log("connection done");
})
.catch((err)=>{
   console.log("error",err);
});

users.hasMany(blogs);
blogs.belongsTo(users);
//this db.blogs is used in controller to perform db operations
const db={
    Sequelize:Sequelize,
    sequelize:sequelize,
    blogs:blogs(sequelize,DataTypes),
    users:users(sequelize,DataTypes),
}
 
sequelize.sync({force:false, alter:true}).then(()=>{
    console.log("yessss sync");
});

module.exports=db;