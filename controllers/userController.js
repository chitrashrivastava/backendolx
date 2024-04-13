const { catchAsyncErrors } = require('../middleware/catchAsyncError')
const User = require('../models/userModel');
const ErrorHandler = require('../utils/ErrorHandler');
const { sendToken } = require('../utils/sendToken');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const imagekit = require('../utils/imagekit').initimagekit()
const Item=require('../models/items')
const Product = require('../models/Product')
exports.userSignup = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
    const existingid = await User.findOne({ email });

    if (existingid) {
        return res.status(400).json({ error: 'Email already registered.' });
    }
    const student = await new User(req.body).save();
    sendToken(student, 201, res)
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.id).exec()
    res.json({ user })
})

exports.userSignin = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }).select("+password").exec()
    if (!user)
        return next(new ErrorHandler("User not found with this email address", 404))
    const isPasswordMatched = await user.comparePassword(req.body.password)
    if (!isPasswordMatched)
        return next(new ErrorHandler("Wrong Credentials", 401))
    sendToken(user, 200, res)
})


exports.userUpdate = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.id;
    const update = req.body;
console.log(req.body)
console.log(req.files)

    try {
        const imageUploadResponse = await imagekit.upload({
            file: req.files.avatar.data.toString("base64"),
            fileName: `${userId}.jpg`,
            useUniqueFileName: false
        });

        const user = {
            name: update.name,
            email: update.email,
            phone: update.phone,
            avatar: {
                fieldId: imageUploadResponse.fileId,
                url: imageUploadResponse.url
            }
        };

        const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });
        if (!updatedUser) {
            throw new ErrorHandler("User not found", 404);
        }
        res.status(200).json({
            message: "User Updated Successfully",
            user: updatedUser
        });
    } catch (err) {
        next(err);
    }
})


exports.userProduct = catchAsyncErrors(async (req, res, next) => {
    const uploadData = req.body;
    const uploadFile = req.files.image; // Assuming the uploaded file is available in req.files.avatar
    console.log(uploadData);
    console.log(uploadFile);

    try {
        // Upload image to ImageKit
        const imageUploadResponse = await imagekit.upload({
            file: uploadFile.data.toString("base64"),
            fileName: `${uploadFile.name}.jpg`, // Assuming you want to name the uploaded file with its original name
            useUniqueFileName: false
        });

        // Construct product object with uploaded image URL
        const product = {
            productname: uploadData.productname,
            price: uploadData.price,
            description: uploadData.description,
            categories: uploadData.category,
            image: {
                fieldId: imageUploadResponse.fileId,
                url: imageUploadResponse.url
            }
        };

        // Save the product to the database
        const savedProduct = await Product.create(product);

        res.status(200).json({
            message: "Product Uploaded Successfully",
            product: savedProduct
        });
    } catch (err) {
        next(err);
    }
});

exports.signout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token")
    res.json({ message: "Successfully Signout" })
})

exports.fetchCar = catchAsyncErrors(async(req,res,next) =>{
   const {dy} =req.params //param se dy nikal liya
   const all = await Product.find({categories:dy}) 
   res.json({
    placement:all
   })
    })
