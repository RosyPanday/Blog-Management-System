const { fetchBlogs, singleFetchBlogs, addBlogs, editBlogs, deleteBlogs } = require('../controllers/blog.controller');

const router = require('express').Router();

router.route("/blogs").get(fetchBlogs).post(addBlogs);
router.route("/blogs/:id").get(singleFetchBlogs).patch(editBlogs).delete(deleteBlogs);

module.exports=router;