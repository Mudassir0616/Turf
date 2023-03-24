import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import adminRoutes from './routes/admin.js'
import userRoutes from './routes/auth.js'
import bookRoutes from './routes/booking.js'
import contactRoutes from './routes/contact.js'
import reviewRoutes from './routes/review.js'
import profileRoutes from './routes/profiles.js'
import corporateRoutes from './routes/corporate.js'
const app = express()

app.use(cors())

app.use(bodyParser.json({ limit:'50mb', extended: true}));
app.use(bodyParser.urlencoded({ limit:'50mb', extended: true}));
app.use(express.json())

app.use('/users', userRoutes)
app.use('/admin', adminRoutes)
app.use('/booking', bookRoutes)
app.use('/contact', contactRoutes)
app.use('/reviews', reviewRoutes)
app.use('/profile', profileRoutes)
app.use('/corporate-booking', corporateRoutes)

const PORT = process.env.PORT || 4001

const CONNECTION_URL = 'mongodb://vegeta0616:mudassir020616@ac-apjwdak-shard-00-00.fbbk4lp.mongodb.net:27017,ac-apjwdak-shard-00-01.fbbk4lp.mongodb.net:27017,ac-apjwdak-shard-00-02.fbbk4lp.mongodb.net:27017/?ssl=true&replicaSet=atlas-hhxvf2-shard-0&authSource=admin&retryWrites=true&w=majority'

app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`))

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true},
 ()=> console.log('connected to Database'))