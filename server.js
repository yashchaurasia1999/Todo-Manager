const express=require('express')
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const dotenv=require('dotenv')
const userAuth=require('./routes/userAuth')
const taskRoutes=require('./routes/taskRoutes')
const cors=require('cors')
const path=require('path')
// const MongoClient = require('mongodb').MongoClient;

dotenv.config()
const app=express()
app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))
app.use('/',userAuth)
app.use('/',taskRoutes)
// const ___dirname1=path.resolve()
// ...................Deployment............................

// if(process.env.NODE_ENV==='production')
// {
//     app.use(express.static(path.join(___dirname1,'/client/build')))
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(___dirname1,'client','build','index.html'))
//     })
// }
// else
// {
//     app.get('/',(req,res)=>{
//         res.send('API is running successfully')
//     })
// }

// ...................Deployment............................

app.get('/',(req,res)=>{
    res.json({
        status:'success',
        msg:'hello World'
    })
})



const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.Mongo_DB)
    .then(() => {
        console.log('Database connected successfully!');
        // Start the server after successful MongoDB connection
        app.listen(PORT, () => {
            console.log(`Server connected successfully on port ${PORT}!`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
