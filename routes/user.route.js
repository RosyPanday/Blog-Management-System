const { registerUser, loginUser } = require('../controllers/user.controller');
//It returns an object that allows you to define different HTTP methods (GET, POST, PUT, DELETE, etc.) for a single, specific path in a cleaner, more organized way.This avoids typing the same route path multiple times.

const router =require('express').Router();

router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);

module.exports=router;

