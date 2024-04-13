const express=require('express')
const router=express.Router()
const {userSignup,userSignin,currentUser, userUpdate, signout , userProduct,fetchCar}=require('../controllers/userController')
const {isAuthenticated} =require('../middleware/auth')
router.post('/signup',userSignup)

router.post('/user', isAuthenticated, currentUser)

router.post('/update/:id',isAuthenticated,userUpdate)

router.post('/uploadproduct',isAuthenticated, userProduct)

router.post('/login',userSignin)

router.get('/logout',isAuthenticated,signout)

router.get('/fetchproduct/:dy',fetchCar)




module.exports=router