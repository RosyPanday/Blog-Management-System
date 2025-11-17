

const blogModel =(sequelize,DataTypes)=>{
    const blogs= sequelize.define("blogs",{
        blogTitle:{
            type:DataTypes.STRING,
        },
        blogAuthor:{
          type:DataTypes.STRING,
        },
        blogContent:{
            type:DataTypes.STRING,
        },
        blogStatus:{
            type:DataTypes.STRING,
            defaultValue:"active"
        },
        blogPublishDate:{
            type:DataTypes.DATE,
            defaultValue:DataTypes.NOW
        },
    });
    return blogs;
};

module.exports=blogModel;