const express= require('express');
const userControllers= require('../controllers/user');

const router=express.Router();

router.get('/signup',userControllers.getSignup);
router.post('/signup', userControllers.postSignup);
router.post('/login',userControllers.postLogin)
router.post('/logout',userControllers.postLogout)

module.exports= router;