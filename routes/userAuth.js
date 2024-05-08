const express=require('express')
const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const isLoggedIn=require('../middleware/middleware')
const userModel = require('../models/userModel')
const router=express.Router()
// const middleware=require('../middleware/middleware')

router.post("/register",async(req,res)=>{
    try {
        const {name, email, password, confirmPassword}=req.body
        const bcryptPass=await bcrypt.hash(password,10)
        const bcryptConfirmPass=await bcrypt.hash(confirmPassword,10)
        // console.log(bcryptConfirmPass)
        console.log(name+"  "+email+" "+password+"  "+confirmPassword)
        const emailExist=await User.findOne({email})

     
        if(!emailExist)
        {
            const data= new userModel({name,email,password:bcryptPass,confirmPassword:bcryptConfirmPass})
            const savedUser=await data.save()
            console.log(data)
            res.json({
                userdata:'success',
                userdata:data
            })
        }
        else
        {
            res.json({
                status:'failed',
                msg:'User already exist ! Please try another E-mail id'
            })
        }

    } catch (error) {
        console.log(error)
    }
})
router.post('/update-user', isLoggedIn, async (req, res) => {
    try {
      const { name, password } = req.body;
      const userId = res.userId;
    //   console.log(userId)
      const userUpdate= await User.findByIdAndUpdate(userId, {name:name});
      console.log('userUpdate->',userUpdate)
        
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userUpdated=await User.findByIdAndUpdate(userId, { password: hashedPassword });
        // console.log(userUpdated)
      }
      
  
      res.json({ status: 'success', message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  });
router.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body
        console.log(email)
        const emailExist=await User.findOne({email})
        console.log(emailExist)
        if(emailExist)
        {
            const bcryptPass=await bcrypt.hash(password,10)
            const dataValid=await bcrypt.compare(password,emailExist.password)
            if(dataValid)
            {
                const payload={
                    userId: emailExist._id, 
                    email: emailExist.email
                }
                
                const jwttoken=jwt.sign(payload,process.env.secret_key)
                console.log(emailExist.name)
                res.json({
                    status:'Success',
                    msg:'Logged In Successfully',
                    name:emailExist.name,
                    id:emailExist._id,
                    userEmail:emailExist.email,
                    jwttoken:jwttoken
                })
            }
            else
            {
                res.json({
                    status:'Failed',
                    reason:'incorrect',
                    msg:'Your Credentials are incorrect'
                })
            }
          
        } 
        else
        {
            res.json({
                status:'Failed',
                reason:'not exist',
                msg:'User does not exist'
            })
        }
    } catch (error) {
        console.log(error)
    }
    


})

module.exports=router;