import express from 'express'
import Admin from '../models/adminModel.js'
import OtpModel from '../models/OtpModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'

const router = express.Router()

const api_key = "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"


router.post('/signIn', async(req,res)=>{
    const { email, password } = req.body

    try {
        const signedUser = await Admin.findOne({ email })
        
        if(!signedUser) return res.status(404).json({status: false, message: 'You are Unauthorized to be Admin'})

        const isPasswordCorrect = await bcrypt.compare(password, signedUser.password)

        if(!isPasswordCorrect) return res.status(404).json({status: false, message: 'Incorrect Password'})

        const token = jwt.sign({email: signedUser.email, id: signedUser._id}, 'turf', {expiresIn:'3min'})

        res.status(200).json({admin:true, id: signedUser._id, email: signedUser.email, phone: signedUser.phone, name: signedUser.name, userImg: signedUser.userImg, token})

        
    } catch (error) {

        res.status(500).json(error)
    }
})

router.patch('/:id', async(req,res)=>{
    const id  = req.params.id;
    const body = req.body

    const update = await Admin.findByIdAndUpdate(id, body, {new: true})
    try { 
        res.send(update)
    } catch (error) {
        console.log(error)
    }
})
    
    const transporter = nodemailer.createTransport(sendgridTransport({
        auth:{
            api_key
        }
    }))

    router.post('/resetPassword', async(req,res) =>{
        const { email, code } = req.body;

            const data = await OtpModel.find({email, code})

                if(data && data.length > 0){
                const user = await Users.findOne({email});

                const password = req.body.password
                const hashedPassword = await bcrypt.hash(password,12)
                user.password = hashedPassword

                await user.save()

                res.status(201).send(user)
                } else{
                    res.status(404).json('Invalid OTP')
                }
            
        
    })
    
    router.post('/emailSent', async(req,res) =>{
    
    try {
        const data = await Admin.findOne({email: req.body.email})

        if(data){
            let otpCode = Math.floor((Math.random()*10000) + 1)
            let otpData = new OtpModel({
                email: req.body.email,
                code: otpCode
            })

            await otpData.save()

            await  transporter.sendMail({
                to: req.body.email,
                from:'mudassirshaikh6432@gmail.com',
                subject:'Please verify your Otp',
                html: `<h1>Your Otp is ${otpData?.code}</h1>`
            })

            res.status(201).json('Otp has been sent to your email')
        }
    } catch (error) {
        console.log(error)
    }
})


export default router