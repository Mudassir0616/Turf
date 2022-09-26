import express from 'express'
import Review from '../models/testimonialModel.js'

const router = express.Router()

router.post('/', async(req,res)=>{
    const { name, testimonial } = req.body

    try {
        const signedUser = await Review.findOne({ name })

        if(!signedUser){
            // res.status(400).send({ status: false, message: 'User already exist'})
            const newReview = new Review({name, testimonial})
            await newReview.save()
            res.send(newReview)
        } else{
            res.status(404).send('Your response has already been recorder')
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/', async(req,res)=>{
    try {
        const review = await Review.find()

        res.send(review)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/:id', async(req, res)=>{
    const { id } = req.params;

    await Review.findByIdAndRemove(id)
    res.json('Post Deleted !!!')
})
export default router