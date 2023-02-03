import express from 'express'
import Bookings from '../models/bookModel.js'

const router = express.Router()

router.get('/', async(req,res) =>{
    
    try {
        const reservations = await Bookings.find()

        res.json(reservations)
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async(req,res) =>{
    
    const post = req.body  
    // const { email } = post; 

    const newPost = new Bookings({...post})
    try {
        // const bookedUser = await Bookings.findOne({ email })

        // if(bookedUser) return res.status(400).json({ status: false, message: 'Booking already exist'})

        await newPost.save()

        res.status(201).send(newPost)
    } catch (error) {
        res.status(409).send(error)
    }
})

router.delete('/:id', async(req, res)=>{
    const { id } = req.params;

    await Bookings.findByIdAndRemove(id)
    res.json('Post Deleted !!!')
})


export default router