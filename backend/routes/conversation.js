import express from 'express'
import Conversation from '../models/conversationModel.js'

const router = express.Router()

router.post('/', async(req, res)=>{
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
      await newConversation.save()
      res.status(201).send(newConversation)

    } catch (error) {
      res.status(500).send(error)
    }
});

router.get('/:userId', async(req,res) =>{
    try {
      const conversations = await Conversation.find({
        members: {$in : [req.params.userId]}
      })

      res.status(200).send(conversations)
    } catch (error) {
      res.status(500).send(error)
    }
})
export default router;