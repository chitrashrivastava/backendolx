const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://chitrashrivastava64:5u5rtZVYBrZnS7AO@cluster0.lbykw0o.mongodb.net/OLXDB?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('DB connected')
})
.catch((err)=>{
    console.log(err)
})