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
    const {date, from, to, players} = post

    const newPost = new Corporate({...post})
    try {
      //   const bookings = await Corporate.find({ date });

      //   // Convert the start and end times to Date objects for comparison
      //   const newStartTime = new Date(date + 'T' + from);
      //   const newEndTime = new Date(date + 'T' + to);
      
      //   // Check for overlaps with existing bookings
      //   const isOverlap = bookings.some(booking => {
      //     const existingStartTime = new Date(date + 'T' + booking.from);
      //     const existingEndTime = new Date(date + 'T' + booking.to);
      
      //     return (
      //       (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
      //       (newEndTime > existingStartTime && newEndTime <= existingEndTime)
      //     );
      //   });
      
      //   if (isOverlap) {
      //     return res.status(400).json({ message: 'There is already a booking at this time.' });
      //   }
      

      // if(players > 15) return res.status(404).json({ status: false, message: `Number of players cannot exceed by 15`})

      await newPost.save()
      res.status(201).send(newPost)
    } catch (error) {
        res.status(409).send(error)
    }
})

router.post('/verify', async (req, res) => {

  const post = req.body
  const { date, from, to, players, turf } = post;

  try {
    const bookings = await Corporate.find({ date });

    // Convert the start and end times to Date objects for comparison
    const newTurf = turf
    const newStartTime = new Date(date + 'T' + from);
    const newEndTime = new Date(date + 'T' + to);

    // Check for overlaps with existing bookings
    const isOverlap = bookings.some(booking => {
      const existingStartTime = new Date(date + 'T' + booking.from);
      const existingEndTime = new Date(date + 'T' + booking.to);

      // Check if the new booking overlaps with the existing booking
      const overlap = (
        (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
        (newEndTime > existingStartTime && newEndTime <= existingEndTime)
      );

      // Check if the new booking is for the same turf as the existing booking
      const sameTurf = booking.turf === newTurf;

      return overlap && sameTurf;
    });

    if (isOverlap) {
      return res.status(400).json({ message: 'There is already a booking at this time for this turf.' });
    }
    if (players > 15) return res.status(404).json({ status: false, message: `Number of players cannot exceed 15.` })
    if (players < 0) return res.status(404).json({ status: false, message: `Please enter number of players properly` })

    res.status(200).send(post)
  } catch (error) {
    res.status(409).send(error)
  }
})

router.delete('/:id', async(req, res)=>{
    const { id } = req.params;

    await Corporate.findByIdAndRemove(id)
    res.json('Reservation Deleted !!!')
})

export default router