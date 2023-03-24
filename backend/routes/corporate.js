import express from 'express'
import Corporate from '../models/corporateModel.js'

const router = express.Router()

router.get('/', async(req,res) =>{
    
    try {
        const reservations = await Corporate.find()

        res.json(reservations)
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async(req,res) =>{
    
    const post = req.body  
    const { date, from, to } = post; 

    const newPost = new Corporate({...post})
    try {
        
        const sameDate = await Corporate.findOne({date})
        console.log('sameDate',sameDate)
        const sameTime = await Corporate.find({from: from, to:to})
        if(sameDate && sameTime) 
        return res.status(404).json({ status: false, message: 'This slot has already been booked'})

        await newPost.save()

        res.status(201).send(newPost)
    } catch (error) {
        res.status(409).send(error)
    }
})

export default router