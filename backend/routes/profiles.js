import express from 'express'
import Profile from '../models/profileModel.js'


const router = express.Router()

router.post('/', async(req,res)=>{
    const profile = req.body

    const newProfile = new Profile({...profile})

    try {
        await newProfile.save()
        res.send(newProfile)

    } catch (error) {
        res.status(500).json(error)
      }
})

router.patch('/:id', async(req,res)=>{
    const id  = req.params.id;
    const body = req.body

    const update = await Profile.findByIdAndUpdate(id, body, {new: true})

    res.send(update)
})

router.get('/', async(req,res) =>{
    
    try {
        const user = await Profile.find()

        res.json(user)
    } catch (error) {
        console.log(error)
    }
})


export default router