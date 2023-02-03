import express from 'express'
import Users from '../models/authModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import sendgridTransport from 'nodemailer-sendgrid-transport'
import OtpModel from '../models/OtpModel.js'

const router = express.Router()

const api_key = "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"


router.post('/signIn', async(req,res)=>{
    const { email, password } = req.body

    try {
        const signedUser = await Users.findOne({ email })
        
        if(!signedUser) return res.status(404).json({status: false, message: 'Please Sign In'})

        const isPasswordCorrect = await bcrypt.compare(password, signedUser.password)

        if(!isPasswordCorrect) return res.status(404).json({status: false, message: 'Incorrect Password'})

        const token = jwt.sign({email: signedUser.email, id: signedUser._id}, 'turf', {expiresIn:'3min'})

        res.status(200).json({admin: false, name: signedUser.name, email: signedUser.email, id: signedUser._id, phone: signedUser.number, token})

        
    } catch (error) {

        res.status(500).json(error)
    }
})


router.post('/signUp', async(req,res)=>{
    const { name, email, number, password, cPassword } = req.body

    try {
        const signedUser = await Users.findOne({ email })

        if(signedUser) return res.status(400).json({ status: false, message: 'User already exist'})

        const userNumber = await Users.findOne({ number })

        if(userNumber) return res.status(400).json({ status: false, message: 'This number ha already been taken !!'})

        if(password !== cPassword) return res.status(400).json({ message:"Password doesn't match..." })

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await Users.create({ email, password: hashedPassword, name, number})

        const token = jwt.sign({ email: result.email, id: result._id}, 'turf', {expiresIn:'30min'});

        // await  transporter.sendMail({
        //     to: result.email,
        //     from:'mudassirshaikh6432@gmail.com',
        //     subject:'Signed Up successfully',
        //     html: `<h1>Welcome ${result.name}</h1>`
        // })

         res.status(200).json({id: result._id, admin: false, name: result.name, email: result.email, phone: result.number, token})
         
        } catch (error) {
            res.status(500).json(error)
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
    
    
        const data = await Users.findOne({email: req.body.email})

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

            res.status(201).json(otpData?.code)
        } else{
            res.status(404).send('Invalid email')
        }
    
})


export default router