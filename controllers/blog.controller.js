const blogs=require("../database/connection");

const fetchBlogs=async(req,res)=>{
   try{
        const datas=await blogs.findAll();
        res.status(200).json({
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

const singleFetchBlogs= async(req,res)=>{
   try{
       const {id}=req.params;
        const datas=await blogs.findByPk(id);
        res.status(200).json({
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
      const {blogTitle,blogAuthor,blogContent,blogStatus,blogPublishDate}=req.body;
       
      await blogs.create({
        blogTitle,
        blogAuthor,
        blogContent,
        blogStatus,
        blogPublishDate,
      })
    }
     catch(error){
       res.status(500).json({
         message:"adding failed",
       })
    }
};

const editBlogs= async(req,res)=>{
    try{
        const {id}=req.params;
        const {blogTitle,blogAuthor,blogContent,blogStatus,blogPublishDate}=req.body;
        
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
    } catch(error){
        res.status(500).json({
            message:"update failed",
        })
     }
}

const deleteBlogs= async(req,res)=>{
    try{
       const {id}= req.params;
        await blogs.destroy({
            where:{id},
        })
    }catch(error){
        res.status(500).json({
            message:"deletion failed",
        })
    }
}

module.exports= {fetchBlogs,addBlogs,editBlogs,deleteBlogs,singleFetchBlogs};