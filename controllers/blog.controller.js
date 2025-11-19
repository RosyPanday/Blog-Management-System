const blogs=require("../database/connection");

//req.body is an object that contains key-value pairs of data submitted in the request body.
const fetchBlogs=async(req,res)=>{
   try{
        const datas=await blogs.findAll();
         return res.status(200).json({
            message:"all blogs fetched",
            datas:datas,
        })
   }
   catch(error){
      return res.status(500).json({
        message:"failed",
     })
   }
};

const singleFetchBlogs= async(req,res)=>{
   try{
       const {id}=req.params;
        const datas=await blogs.findByPk(id);
         return res.status(200).json({
            message:"all blogs fetched",
            datas:datas,
        })
   }
   catch(error){
     res.status(500).json({
        message:"failed",
     })
   }
};

const addBlogs=async(req,res)=>{
    try{
      const usersId = req.user.id;

      const {blogTitle,blogAuthor,blogContent,blogStatus,blogPublishDate}=req.body;
       
      await blogs.create({
        blogTitle,
        blogAuthor,
        blogContent,
        blogStatus,
        blogPublishDate,
        id:usersId,
      })
      return res.status(201).json({
        message:"blog added successfully",
      });
    }
     catch(error){
       return res.status(500).json({
         message:"adding failed",
       })
    }
};

const editBlogs= async(req,res)=>{
    try{
        const usersId = req.user.id;
        const {id}=req.params;
        const {blogTitle,blogAuthor,blogContent,blogStatus,blogPublishDate}=req.body;
        
        //does the blog exist?
        const blog= await blogs.findByPk(id);
        if(!blog){
            return res.status(404).json({
                message:"blog not found",
            });
        };

        //if it exists, whose blog is it?
        if(blog.id!==usersId && req.user.role!=="admin"){
            return res.status(403).json({
                message:"forbidden, you cant edit this blog",
            });
        }

        await blogs.update({
                blogTitle,
                blogAuthor,
                blogContent,
                blogStatus,
                blogPublishDate, 
              }
                , {
                    where: {id}
                });  
                return res.status(200).json({
                    message:"blog updated successfully",
                });   
    } catch(error){
        res.status(500).json({
            message:"update failed",
        })
     }
}

const deleteBlogs= async(req,res)=>{
    try{
        const usersId = req.user.id;
       const {id}= req.params;

       const blog= await blogs.findByPk(id);

       if(!blog){
        return res.status(404).json({
            message:"blog not found",
        })
       };
       //but blog exists.. but whose?

       if(blog.id!==usersId && req.user.role!=="admin"){
        return res.status(403).json({
            message:"forbidden, you cant delete this blog",
        });
       }
        await blogs.destroy({
            where:{id},
        })
    }catch(error){
        res.status(500).json({
            message:"deletion failed",
        });
    }
}

module.exports= {fetchBlogs,addBlogs,editBlogs,deleteBlogs,singleFetchBlogs};