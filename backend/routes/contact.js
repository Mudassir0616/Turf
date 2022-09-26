import express, { application } from 'express'
import contactModel from '../models/contactModel.js'

const router = express.Router()

router.post('/', async(req, res)=>{
    const body = req.body
    const newContact = new contactModel({...body, message:'Your response has been recorder'})

    try {
        await newContact.save()

        res.send(newContact)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router