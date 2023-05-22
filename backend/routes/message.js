import express from 'express'
import Message from '../models/messageModel.js';

const router = express.Router()

router.post('/', async(req,res)=> {
    const newMessage = new Message(req.body)

    try {
        await newMessage.save()
        res.status(200).send(newMessage)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.get('/:conversationId', async(req, res)=> {
    const chats = await Message.find({
      conversationId: req.params.conversationId
    });

    res.status(200).send(chats)
})

router.delete('/:id', async(req, res)=>{
    const { id } = req.params;

    await Message.findByIdAndRemove(id)
    res.json('Chat Deleted !!!')
})

router.patch('/:id', async(req,res)=>{
    const id  = req.params.id;
    const body = req.body

    try {
        const update = await Message.findByIdAndUpdate(id, body, {new: true})
        res.send(update)
    } catch (error) {
        res.status(400).send(error)
    }

})


export default router;