const express=require('express')
const router=express.Router()
const {userSignup,userSignin,currentUser, userUpdate, signout , userProduct}=require('../controllers/userController')
const {isAuthenticated} =require('../middleware/auth')
router.post('/signup',userSignup)

router.post('/user', isAuthenticated, currentUser)

router.post('/update/:id',isAuthenticated,userUpdate)

router.post('/uploadproduct',isAuthenticated, userProduct)

router.post('/login',userSignin)

router.get('/logout',isAuthenticated,signout)
module.exports=router