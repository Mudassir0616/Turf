import { Button,InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import football from '../images/football.webp'
import turf1 from '../images/turf1.jpg'
import turf2 from '../images/turf2.jpg'
import turf3 from '../images/turf3.jpg'
import turf4 from '../images/turf4.jpg'
import turf5 from '../images/turf5.jpg'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { toast, ToastContainer } from 'react-toastify'
import moment from 'moment'


const Book = () => {

  const url = `http://localhost:4001/booking`

  const user = JSON.parse(localStorage.getItem('userProfile'))
  const [bookingData, setBookingData] = useState({ name: user?.name, email: user?.email, number: user?.phone, address:'', sportsType:'', date:'', from:'', to:'', price: 0})
  const [img, setImg] = useState(football)
  const [isCorprateActive, setisCorprateActive] = useState(false)
  const [isIndividualActive, setisIndividualActive] = useState(false)
  const [bookingPrice, setBookingPrice] = useState(0)
  const [corporateBooking, setCorporateBooking] = useState({ purpose:'', date:'', from:'', to:'', enquirer: user?.name, email: user?.email, number: user?.phone, company:'', sportsType:'', price: 0 })
  const [individualPrice, setIndividualPrice] = useState(0)

  const images = [
    turf1,
    turf2,
    turf3, 
    turf4,
    turf5
  ]

  const amenities = [ 'Goalposts', 'Bat', 'Tennis Ball', 'Football', 'Flood Lights', 'Changing Room', 'Washroom']

  const sportsType = [ 'Football', 'Cricket' ];

  const history = useHistory()
  
  let currTime = new Date();
  
  let hh = currTime.getHours();
  let min = currTime.getMinutes();
  let sec = currTime.getSeconds()
  
  currTime = `${hh} : ${min} : ${sec}`
  // console.log('timmmeeeeeeee',currTime)

  let currdate = new Date();
  
  let dd = currdate.getDate();
  let mnth = currdate.getMonth();
  let yr = currdate.getFullYear()
  
  currdate = `${yr}-${mnth}1-${dd}`
  // console.log('Daattttteeeeeeee',currdate)

  const handleClear = ()=>{
    setBookingData({ name: user?.name, email: user?.email, number: user?.phone, address:'', sportsType:'', date:'', from:'', to:'', price: 0})
    setCorporateBooking({ purpose:'', date:'', from:'', to:'', enquirer: user?.name, email: user?.email, number: user?.phone, company:'', sportsType:'', price: 0 })
  }

  const handleChange =(e)=>{
    setBookingData({ ...bookingData, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    const hoursDifference = bookingData?.to.split(':')[0] - bookingData?.from.split(':')[0];
    console.log(hoursDifference)
    if (hoursDifference === 1) {
      setIndividualPrice(1800);
    } else if (hoursDifference === 2) {
      setIndividualPrice(2400);
    } else if (hoursDifference === 3) {
      setIndividualPrice(2900);
    } else if (hoursDifference === 4) {
      setIndividualPrice(3300);
    } else if (hoursDifference > 5) {
      setIndividualPrice(0);
      toast("You're limit has been exceeded", {
        type:'error',
        position:'bottom-right'
      });
    } else if (bookingData?.to && hoursDifference < 0) {
      setIndividualPrice(0);
      toast('Invalid Time', {
        type:'error',
        position:'bottom-right'
      });
    } else if (hoursDifference === 0) {
      setIndividualPrice(0);
    }
  }, [bookingData]);
  
  useEffect(() => {
    setBookingData(prev => ({ ...prev, price: individualPrice }));
  }, [individualPrice]);

  console.log('bkkkkkkkkkkkkk',bookingData)

  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    try {
      const postData = await axios.post(url, bookingData)
      console.log(postData)
      alert('Succesfully Booked')
      handleClear()
      history.push('/dashboard')

    } catch (error) {
      alert(error?.response?.data?.message)
    }
  }

  const fetchCorporate = async()=>{
    const res = await axios.get('http://localhost:4001/corporate-booking')
  }

  useEffect(()=> {
    fetchCorporate()
  },[])

  const handleCorporate = ()=>{
    setisCorprateActive(true);
    setisIndividualActive(false)
    handleClear()
  }

  const handleIndividual = ()=>{
    setisIndividualActive(true);
    setisCorprateActive(false)
    handleClear()
  }
  
  
  const handleChangeCorprate = (e)=>{ 
    setCorporateBooking({...corporateBooking, [e.target.name]: e.target.value})
    
  }

  useEffect(() => {
    const hoursDifference = corporateBooking?.to.split(':')[0] - corporateBooking?.from.split(':')[0];
    
    if (hoursDifference === 1) {
      setBookingPrice(1800);
    } else if (hoursDifference === 2) {
      setBookingPrice(2400);
    } else if (hoursDifference === 3) {
      setBookingPrice(2900);
    } else if (hoursDifference === 4) {
      setBookingPrice(3300);
    } else if (hoursDifference > 5) {
      setBookingPrice(0);
      toast("You're limit has been exceeded", {
        type:'error',
        position:'bottom-right'
      });
    } else if (corporateBooking?.to && hoursDifference < 0) {
      setBookingPrice(0);
      toast('Invalid Time', {
        type:'error',
        position:'bottom-right'
      });
    } else if (hoursDifference === 0) {
      setBookingPrice(0);
    }
  }, [corporateBooking]);
  
  useEffect(() => {
    setCorporateBooking(prev => ({ ...prev, price: bookingPrice }));
  }, [bookingPrice]);

  const startTime = 0; // Start time in minutes (e.g., 9:00 AM = 9 * 60 = 540)
  const endTime = 1500; // End time in minutes (e.g., 12:00 PM = 12 * 60 = 720)
  const interval = 60; // Interval between time slots in minutes (e.g., 30 minutes)

  const timeSlots = [];
  for (let time = startTime; time < endTime; time += interval) {
  const hours = Math.floor(time / 60).toString().padStart(2, '0'); // Get the hours value and pad it with leading zeroes if necessary
  const minutes = (time % 60).toString().padStart(2, '0'); // Get the minutes value and pad it with leading zeroes if necessary
  timeSlots.push(`${hours}:${minutes}`); // Add the time slot string to the array
  }

  const handleCorporateSubmit = async(e)=>{
    e.preventDefault()
    try {
  
      const postData = await axios.post(`http://localhost:4001/corporate-booking`, corporateBooking)
      console.log('pooostttttt',postData)
      toast(`You are Booked for ${moment(corporateBooking.date).format('DD MMM')}`, {
        type:'success',
        position:'bottom-right'
    })
      handleClear()
      history.push('/dashboard')

    } catch (error) {
      toast(`${error?.response?.data?.message}`, {
        type:'error',
        position:'bottom-right'
    })
    }
  } 

  return (
    <div style={{display:'flex', justifyContent:'center', margin:'3rem 7rem', flexDirection:'column', gap:'3rem'}}>
      <ToastContainer/>
      <div>
        <h1 style={{color:'darkgreen', margin:'0'}}>UMRB Turf, Azad Nagar - by SPORLOC</h1>
        <div style={{display:'flex', gap:'2rem'}}>
          <div style={{width:'600px', height:'400px', background:'black'}}>
            <img src={img} width="100%" height="100%" style={{objectFit:'cover'}}/>
          </div>
          <div style={{width:'300px', padding:'2rem 0'}}>
            <p>Backgate, Andheri Sports Complex, Veera Desai Road, Next To Azad Nagar Metro Station, Mumbai 400053.</p>
            <Link to={'/sitemap'} style={{textDecoration:'none'}}>
            <p style={{display:'flex', alignItems:'center', fontSize:'15px', fontFamily:'sans-serif', opacity:'0.8', fontWeight:'100'}}>Map View&nbsp;<MyLocationIcon style={{color:'gray', fontSize:'16px'}}/></p>
            </Link>
          <a href="#book"><button style={{padding:'10px 15px'}}>BOOK NOW</button></a>
          </div>
        </div>
        <div style={{display:'flex', gap:'1rem', margin:'0.5rem 0'}}>
          {images?.map((pic) => (
            <img src={pic} onClick={()=> setImg(pic)} width="100px" height="70px"/>
          ))}
        </div>
      </div>

      {/* Select Booking Type */}
      <div style={{width:'60%'}} id='book'>
      <h2 style={{color:'darkgreen', margin:'0'}}>Select booking Type:</h2>
      <div style={{display:'flex', margin:'2rem 0', gap:'2px'}}>
        <button onClick={handleIndividual} style={{background: isIndividualActive ? 'orange': '', color: isIndividualActive ? 'white': '', padding:'10px', border:'none', borderRadius:'1px', fontSize:'17px', cursor:'poniter'}} className="type-btn">Individual</button>
        <button onClick={handleCorporate} style={{background: isCorprateActive ? 'orange': '', color: isCorprateActive ? 'white': '', padding:'10px', border:'none', borderRadius:'1px', fontSize:'17px', cursor:'poniter'}} className="type-btn">Corporate</button>
      </div>

      {/* Individual */}
      {isIndividualActive && (
        <div style={{display:'flex', alignItems:'flex-start', justifyContent:'flex-start'}}>
        <form onSubmit={handleSubmit} style={{boxShadow:'0px 0px 15px rgba(0,0,0,0.8)', padding:'2rem', width:'100%'}}>
          <h3 style={{color:'darkgreen', margin:'0'}}>Add Booking Enquiry</h3>
          <hr style={{border:'1px solid gray', height:'0', borderTop:'none'}}/>
          <div style={{display:'flex', flexDirection:'column', gap:'20px', margin:'20px 0',}}>
            <TextField variant='outlined' onChange={handleChange} value={user?.name} label="Enquirer's Name" name='enquirer' fullWidth/>
            <TextField variant='outlined' onChange={handleChange} value={user?.email} type='email' label='Email' name='email' fullWidth/>
            <TextField variant='outlined' onChange={handleChange} value={user?.phone} type='number' label='+ 91' name='number' fullWidth/>
            <TextField variant='outlined' onChange={handleChange} name='address' label='Your Address' fullWidth multiline rows={4}/>
            <TextField variant='outlined' onChange={handleChange} name='date' type='date' placeholder='Date' fullWidth required inputProps={{
              min: new Date().toISOString().substr(0, 10),
            }}/>
            <div style={{display:'flex', gap:'2rem'}}>
            <div style={{flex:'1'}}>
            <InputLabel id="time-slot-select-label">From</InputLabel>
            <Select value={bookingData.from} onChange={handleChange} labelId="time-slot-select-label" name='from' variant='filled' fullWidth required>
              {timeSlots.map(time => (
                <MenuItem value={time}>{time}</MenuItem>
              ))}
            </Select>
            </div>

            <div style={{flex:'1'}}>
            <InputLabel id="time-slot-select-label">To</InputLabel>
            <Select value={bookingData.to} onChange={handleChange} labelId="time-slot-select-label" name='to' variant='filled' fullWidth required>
              {timeSlots.map(time => (
                <MenuItem value={time}>{time}</MenuItem>
              ))}
            </Select>
            </div>
            </div>
            <div>
            <InputLabel id="time-slot-select-label">Select Sports Type</InputLabel>
            <Select value={corporateBooking.sportsType} name='sportsType' onChange={handleChange} labelId="time-slot-select-label" fullWidth>
              {sportsType.map(sport => (
                <MenuItem value={sport}>{sport}</MenuItem>
              ))}
            </Select>
            </div>
          </div>
          <p>Your Booking Price{bookingData.price}</p>
          <div>
            <Button type='submit' variant='contained' color='primary'>Book</Button>&nbsp;
            
          </div>
        </form>
      </div>
      )}

      {/* Corporate */}
      {isCorprateActive && (
        <div style={{display:'flex', alignItems:'flex-start', justifyContent:'flex-start'}}>
          <form onSubmit={handleCorporateSubmit} style={{boxShadow:'0px 0px 15px rgba(0,0,0,0.8)', padding:'2rem', width:'100%'}}>
            <h3 style={{color:'darkgreen', margin:'0'}}>Add Booking Enquiry</h3>
            <hr style={{border:'1px solid gray', height:'0', borderTop:'none'}}/>
            <div style={{display:'flex', flexDirection:'column', gap:'20px', margin:'20px 0',}}>
              <TextField variant='outlined' onChange={handleChangeCorprate} name='purpose' label='Purpose' fullWidth/>
              <TextField variant='outlined' onChange={handleChangeCorprate} name='date' type='date' placeholder='Date' fullWidth required inputProps={{
                min: new Date().toISOString().substr(0, 10),
              }}/>
              <div style={{display:'flex', gap:'2rem'}}>
              <div style={{flex:'1'}}>
              <InputLabel id="time-slot-select-label">From</InputLabel>
              <Select value={corporateBooking.from} onChange={handleChangeCorprate} labelId="time-slot-select-label" name='from' variant='filled' fullWidth required>
                {timeSlots.map(time => (
                  <MenuItem value={time}>{time}</MenuItem>
                ))}
              </Select>
              </div>

              <div style={{flex:'1'}}>
              <InputLabel id="time-slot-select-label">To</InputLabel>
              <Select value={corporateBooking.to} onChange={handleChangeCorprate} labelId="time-slot-select-label" name='to' variant='filled' fullWidth required>
                {timeSlots.map(time => (
                  <MenuItem value={time}>{time}</MenuItem>
                ))}
              </Select>
              </div>
              </div>
              <TextField variant='outlined' onChange={handleChangeCorprate} value={user?.name} label="Enquirer's Name" name='enquirer' fullWidth/>
              <TextField variant='outlined' onChange={handleChangeCorprate} value={user?.email} type='email' label='Email' name='email' fullWidth/>
              <TextField variant='outlined' onChange={handleChangeCorprate} value={user?.phone} type='number' label='+ 91' name='number' fullWidth/>
              <TextField variant='outlined' onChange={handleChangeCorprate} label='Company name' name='company' fullWidth/>
              <div>
              <InputLabel id="time-slot-select-label">Select Sports Type</InputLabel>
              <Select value={corporateBooking.sportsType} name='sportsType' onChange={handleChangeCorprate} labelId="time-slot-select-label" fullWidth>
                {sportsType.map(sport => (
                  <MenuItem value={sport}>{sport}</MenuItem>
                ))}
              </Select>
              </div>
            </div>
            <p>Your Booking Price{corporateBooking.price}</p>
            <div>
              <Button type='submit' variant='contained' color='primary'>Book</Button>&nbsp;
              
            </div>
          </form>
        </div>
      )}

      <div style={{marginTop:'4rem'}}>
        <h2>Rules</h2>
        {/* {Create Rules} */}
      </div>
      </div>
    </div>
  )
}

export default Book