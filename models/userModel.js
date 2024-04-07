
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const userModel=new mongoose.Schema({
    username:{
        type:String,
        default:"student"
    },
    
    email:{
        type:String,

    },
    password:{
        type:String,
        select:false,
        maxlength:[15,"Password should exceed more than 15 char"],
        minlength:[6,"Password should atleast 6 char"]

    },
    resetPassword:{
        type:String,
        default:"0"
    },
    phone:{
        type:String,

    },
    avatar:{
        type:Object,
        default:{
            fieldId:"",
            url:"https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D"
        }
    },
   
},
    {timestamps:true}

)
userModel.pre("save",function(){
    if(!this.isModified("password")){
        return;
    }
    let salt=bcrypt.genSaltSync(10);
    this.password=bcrypt.hashSync(this.password,salt)
})

userModel.methods.comparePassword=function(password){
    return bcrypt.compareSync(password,this.password)
}

userModel.methods.getjwttoken=function(){
return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE
})
}
const User=mongoose.model("User",userModel)
module.exports=User