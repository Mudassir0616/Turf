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
import playTurf from '../images/playTurf.jpg'
import FSTurf from '../images/FSTurf.jpg'
import greenField from '../images/greenField.jpg'
import turfPark from '../images/Turf-Park.png'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { toast, ToastContainer } from 'react-toastify'
import moment from 'moment'

const Book = () => {
  const user = JSON.parse(localStorage.getItem('userProfile'))
  const [selectedTurf, setSelectedTurf] = useState('');
  const [bookingData, setBookingData] = useState({ name: user?.name, email: user?.email, number: user?.number, players: null, address:'', sportType:'', date: new Date(), from:'', to:'', price: '', turfName:''})
  const [img, setImg] = useState(football)
  const [isCorprateActive, setisCorprateActive] = useState(false)
  const [isIndividualActive, setisIndividualActive] = useState(false)
  const [bookingPrice, setBookingPrice] = useState('0')
  const [corporateBooking, setCorporateBooking] = useState({ purpose:'', date:new Date(), from:'', to:'', enquirer: user?.name, email: user?.email, players: null, number: user?.number, company:'', sportsType:'', price: '',turf: '' })
  const [individualPrice, setIndividualPrice] = useState('0')

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
    setBookingData({ name: user?.name, email: user?.email, number: user?.number, address:'', players: 0, sportsType:'', turfName: selectedTurf, date:'', from:'', to:'', price: 0})
    setCorporateBooking({ purpose:'', date:'', from:'', to:'', enquirer: user?.name, email: user?.email, number: user?.number, company:'', players:0, sportsType:'', price: 0, turf: selectedTurf })
  }

  const handleChange =(e)=>{
    setBookingData({ ...bookingData, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    const hoursDifference = bookingData?.to.split(':')[0] - bookingData?.from.split(':')[0];
    
    if (hoursDifference === 1) {
      setIndividualPrice('1800');
    } else if (hoursDifference === 2) {
      setIndividualPrice('2400');
    } else if (hoursDifference === 3) {
      setIndividualPrice('2900');
    } else if (hoursDifference === 4) {
      setIndividualPrice('3300');
    } else if (hoursDifference > 5) {
      setIndividualPrice('0');
      toast("You're limit has been exceeded", {
        type:'error',
        position:'bottom-right'
      });
    } else if (bookingData?.to && hoursDifference < 0) {
      setIndividualPrice('0');
      toast('Invalid Time', {
        type:'error',
        position:'bottom-right'
      });
    } else if (hoursDifference === 0) {
      setIndividualPrice('0');
    }
  }, [bookingData]);
  
  useEffect(() => {
    setBookingData(prev => ({ ...prev, price: individualPrice }));
  }, [individualPrice]);

  const handleSubmit = async(e) =>{
    // e.preventDefault()
    try {
  
      const postData = await axios.post(`http://localhost:4001/booking`, bookingData)
      console.log('pooostttttt',postData)
      toast(`You are Booked for ${moment(bookingData.date).format('DD MMM')}`, {
        type:'success',
        position:'bottom-right'
    })
      handleClear()
      history.push('/dashboard')

    } catch (error) {
      console.log(error)
      toast(`${error?.response?.data?.message}`, {
        type:'error',
        position:'bottom-right'
    })
    }
  }

  const fetchCorporate = async()=>{
    await axios.get('http://localhost:4001/corporate-booking')
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
      setBookingPrice('1800');
    } else if (hoursDifference === 2) {
      setBookingPrice('2400');
    } else if (hoursDifference === 3) {
      setBookingPrice('2900');
    } else if (hoursDifference === 4) {
      setBookingPrice('3300');
    } else if (hoursDifference > 5) {
      setBookingPrice('0');
      toast("You're limit has been exceeded", {
        type:'error',
        position:'bottom-right'
      });
    } else if (corporateBooking?.to && hoursDifference < 0) {
      setBookingPrice('0');
      toast('Invalid Time', {
        type:'error',
        position:'bottom-right'
      });
    } else if (hoursDifference === 0) {
      setBookingPrice('0');
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
    // e.preventDefault()
    try {
      const postData = await axios.post(`http://localhost:4001/corporate-booking`, corporateBooking)
    //   console.log('pooostttttt',postData)
    //   toast(`You are Booked for ${moment(corporateBooking.date).format('DD MMM')}`, {
    //     type:'success',
    //     position:'bottom-right'
    // })
      handleClear()
      history.push('/dashboard')

    } catch (error) {
      toast(`${error?.response?.data?.message}`, {
        type:'error',
        position:'bottom-right'
    })
    }
  } 

  // key_id: 'rzp_test_x5TxpJ4BAs6JsK',
  // key_secret: 'GnlVYMovZYvrmA2HdglloMpn',
  const initPayment = (data) => {
		const options = {
			key: "rzp_test_x5TxpJ4BAs6JsK",
			amount: data.amount,
			currency: data.currency,
			name: user?.name,
			description: "Test Transaction",
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "http://localhost:4001/api/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
          if(isIndividualActive){
            handleSubmit()
          } else if(isCorprateActive){
            handleCorporateSubmit()
          }
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

  console.log('ccccccccccc',corporateBooking)
  console.log('bbbbbbbbbbbbb',bookingData)

  const handlePayment = async (e) => {
    e.preventDefault()
		try {
      if(isCorprateActive){
        try {
          const postData = await axios.post(`http://localhost:4001/corporate-booking/verify`, corporateBooking)
          if(postData){
            const orderUrl = "http://localhost:4001/api/payment/orders";
            const { data } = await axios.post(orderUrl, { amount: corporateBooking.price });
            console.log('razorpay',data);
            initPayment(data.data);
          }
        } catch (error) {
          console.log(error)
          toast(`${error?.response?.data?.message}`, {
            type:'error',
            position:'bottom-right'
        })
        }

      } else if(isIndividualActive){
        
        try {
          const postData = await axios.post(`http://localhost:4001/booking/verify`, bookingData)
          if(postData){
            const orderUrl = "http://localhost:4001/api/payment/orders";
            const { data } = await axios.post(orderUrl, { amount: bookingData.price });
            console.log('Individual RRRazorpay',data);
            initPayment(data.data);
          }
        } catch (error) {
          console.log(error)
          toast(`${error?.response?.data?.message}`, {
            type:'error',
            position:'bottom-right'
        })
        }
      }
		} catch (error) {
			console.log(error);
		}
	};

  const handleturfpark = ()=>{
    setSelectedTurf('Turf-Park')
    setBookingData(prevState => ({ ...prevState, turfName: 'Turf-Park' }));
    setCorporateBooking(prevState => ({ ...prevState, turf: 'Turf-Park' }));
    window.scrollBy(0, 300)
  }

  const handlePlay = ()=>{
    setSelectedTurf('Play-Turf')
    setBookingData(prevState => ({ ...prevState, turfName: 'Play-Turf' }));
    setCorporateBooking(prevState => ({ ...prevState, turf: 'Play-Turf' }));
    window.scrollBy(0, 300)
  }

  const handleFS = ()=>{
    setSelectedTurf('FS-Turf')
    setBookingData(prevState => ({ ...prevState, turfName: 'FS-Turf' }));
    setCorporateBooking(prevState => ({ ...prevState, turf: 'FS-Turf' }));
    window.scrollBy(0, 300)
  }

  const handleGreenfield = ()=>{
    setSelectedTurf('Greenfield')
    setBookingData(prevState => ({ ...prevState, turfName: 'Greenfield' }));
    setCorporateBooking(prevState => ({ ...prevState, turf: 'Greenfield' }));
    window.scrollBy(0, 300)
  }

  return (
    <div style={{margin:'3rem 7rem'}}>
      <ToastContainer/>
      <h1 style={{color:'darkgreen'}}>CHOOSE A GROUND</h1>
      <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start', gap:'2rem'}}>

        {/* SELECT TURFS */}
        <div style={{ cursor:'pointer', width:'350px'}} className='turfs' onClick={handleturfpark}>
          <img src={turfPark} alt="playTurf" width='84%' style={{margin:'10px 0'}}/>
          <div style={{margin:'10px'}}>
            <h4 style={{color:'darkgray', margin:'0', paddingLeft:'5px'}}>Turf Park - St. Andrews - <span style={{color:'darkgreen'}}>By GoTurf </span></h4>
            <p style={{display:'flex', alignItems:'center', margin:'7px 0', fontSize:'12px'}}><LocationOnIcon style={{fontSize:'16px'}}/> Malad - Mumbai</p>
          </div>
        </div>

        <div style={{ cursor:'pointer', width:'350px'}} className='turfs' onClick={handlePlay}>
          <img src={playTurf} alt="playTurf" width='100%' style={{margin:'10px 0'}}/>
          <div style={{margin:'10px'}}>
            <h4 style={{color:'darkgray', margin:'0', paddingLeft:'5px'}}>Play The Turf, Malad - <span style={{color:'darkgreen'}}>By GoTurf </span></h4>
            <p style={{display:'flex', alignItems:'center', margin:'7px 0', fontSize:'12px'}}><LocationOnIcon style={{fontSize:'16px'}}/> Malad - Mumbai</p>
          </div>
        </div>

        <div style={{ cursor:'pointer', width:'350px'}} className='turfs' onClick={handleFS}>
          <img src={FSTurf} alt="playTurf" width='100%' style={{margin:'10px 0'}}/>
          <div style={{margin:'10px'}}>
            <h4 style={{color:'darkgray', margin:'0', paddingLeft:'5px'}}>FS - Turf, Churchgate - <span style={{color:'darkgreen'}}>By GoTurf </span></h4>
            <p style={{display:'flex', alignItems:'center', margin:'7px 0', fontSize:'12px'}}><LocationOnIcon style={{fontSize:'16px'}}/> Malad - Mumbai</p>
          </div>
        </div>

        <div style={{ cursor:'pointer', width:'350px'}} className='turfs' onClick={handleGreenfield}>
          <img src={greenField} alt="playTurf" width='100%' style={{margin:'10px 0'}}/>
          <div style={{margin:'10px'}}>
            <h4 style={{color:'darkgray', margin:'0', paddingLeft:'5px'}}>Greenfield Turf, Borivali - <span style={{color:'darkgreen'}}>By GoTurf </span></h4>
            <p style={{display:'flex', alignItems:'center', margin:'7px 0', fontSize:'12px'}}><LocationOnIcon style={{fontSize:'16px'}}/> Malad - Mumbai</p>
          </div>
        </div>
      </div>

      {/* Selected Turf */}
      {selectedTurf === 'Play-Turf' && (
        <div>
        <h1 style={{color:'darkgreen', margin:'10px 0'}}>Play Turf</h1>
        <div style={{display:'flex', gap:'2rem'}}>
          <div style={{width:'600px'}}>
            <img src={img} width="100%" height="100%" style={{objectFit:'cover'}}/>
          </div>
          <div style={{width:'300px', padding:'2rem 0'}}>
            <p>St. Andrews School Ground, St Domnic Rd, Bandra West, Mumbai, Maharashtra 400050</p>
            <Link to={'/sitemap'} style={{textDecoration:'none'}}>
            <p style={{display:'flex', alignItems:'center', fontSize:'15px', fontFamily:'sans-serif', opacity:'0.8', fontWeight:'100'}}>Map View&nbsp;<MyLocationIcon style={{color:'gray', fontSize:'16px'}}/></p>
            </Link>
            <p>Ammenities:</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'10px'}}>
            {
            amenities.map((ammitie)=>(
              <div style={{backgroundColor:'lightgrey',width:'90px',height:'30px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'bold'}}><p>{ammitie}</p></div>
                
            ))
            }</div>
          <a href="#book"><button style={{padding:'15px 30px',margin:'10px 0' ,background:'orange',color:'white',border:'none',fontSize:'20px',fontWeight:'600'}}>BOOK NOW</button></a>
          </div>
        </div>
        <div style={{display:'flex', gap:'1rem', margin:'0.5rem 0'}}>
          {images?.map((pic) => (
            <img src={pic} onClick={()=> setImg(pic)} width="100px" height="70px"/>
          ))}
        </div>
      </div>
      )}
      
      {selectedTurf === 'FS-Turf' && (
        <div>
        <h1 style={{color:'darkgreen', margin:'10px 0'}}>FS Turf</h1>
        <div style={{display:'flex', gap:'2rem'}}>
          <div style={{width:'600px'}}>
            <img src={img} width="100%" height="100%" style={{objectFit:'cover'}}/>
          </div>
          <div style={{width:'300px', padding:'2rem 0'}}>
            <p>St. Andrews School Ground, St Domnic Rd, Bandra West, Mumbai, Maharashtra 400050</p>
            <Link to={'/sitemap'} style={{textDecoration:'none'}}>
            <p style={{display:'flex', alignItems:'center', fontSize:'15px', fontFamily:'sans-serif', opacity:'0.8', fontWeight:'100'}}>Map View&nbsp;<MyLocationIcon style={{color:'gray', fontSize:'16px'}}/></p>
            </Link>
            <p>Ammenities:</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'10px'}}>
            {
            amenities.map((ammitie)=>(
              <div style={{backgroundColor:'lightgrey',width:'90px',height:'30px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'bold'}}><p>{ammitie}</p></div>
                
            ))
            }</div>
          <a href="#book"><button style={{padding:'15px 30px',margin:'10px 0' ,background:'orange',color:'white',border:'none',fontSize:'20px',fontWeight:'600'}}>BOOK NOW</button></a>
          </div>
        </div>
        <div style={{display:'flex', gap:'1rem', margin:'0.5rem 0'}}>
          {images?.map((pic) => (
            <img src={pic} onClick={()=> setImg(pic)} width="100px" height="70px"/>
          ))}
        </div>
      </div>
      )}
      
      {selectedTurf === 'Greenfield' && (
        <div>
        <h1 style={{color:'darkgreen', margin:'10px 0'}}>Greenfield Turf</h1>
        <div style={{display:'flex', gap:'2rem'}}>
          <div style={{width:'600px'}}>
            <img src={img} width="100%" height="100%" style={{objectFit:'cover'}}/>
          </div>
          <div style={{width:'300px', padding:'2rem 0'}}>
            <p>St. Andrews School Ground, St Domnic Rd, Bandra West, Mumbai, Maharashtra 400050</p>
            <Link to={'/sitemap'} style={{textDecoration:'none'}}>
            <p style={{display:'flex', alignItems:'center', fontSize:'15px', fontFamily:'sans-serif', opacity:'0.8', fontWeight:'100'}}>Map View&nbsp;<MyLocationIcon style={{color:'gray', fontSize:'16px'}}/></p>
            </Link>
            <p>Ammenities:</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'10px'}}>
            {
            amenities.map((ammitie)=>(
              <div style={{backgroundColor:'lightgrey',width:'90px',height:'30px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'bold'}}><p>{ammitie}</p></div>
                
            ))
            }</div>
          <a href="#book"><button style={{padding:'15px 30px',margin:'10px 0' ,background:'orange',color:'white',border:'none',fontSize:'20px',fontWeight:'600'}}>BOOK NOW</button></a>
          </div>
        </div>
        <div style={{display:'flex', gap:'1rem', margin:'0.5rem 0'}}>
          {images?.map((pic) => (
            <img src={pic} onClick={()=> setImg(pic)} width="100px" height="70px"/>
          ))}
        </div>
      </div>
      )}
      
      {selectedTurf === 'Turf-Park' && (
        <div>
        <h1 style={{color:'darkgreen', margin:'10px 0'}}>Turf Park - St. Andrews</h1>
        <div style={{display:'flex', gap:'2rem'}}>
          <div style={{width:'600px'}}>
            <img src={img} width="100%" height="100%" style={{objectFit:'cover'}}/>
          </div>
          <div style={{width:'300px', padding:'2rem 0'}}>
            <p>St. Andrews School Ground, St Domnic Rd, Bandra West, Mumbai, Maharashtra 400050</p>
            <Link to={'/sitemap'} style={{textDecoration:'none'}}>
            <p style={{display:'flex', alignItems:'center', fontSize:'15px', fontFamily:'sans-serif', opacity:'0.8', fontWeight:'100'}}>Map View&nbsp;<MyLocationIcon style={{color:'gray', fontSize:'16px'}}/></p>
            </Link>
            <p>Ammenities:</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'10px'}}>
            {
            amenities.map((ammitie)=>(
              <div style={{backgroundColor:'lightgrey',width:'90px',height:'30px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'bold'}}><p>{ammitie}</p></div>
                
            ))
            }</div>
          <a href="#book"><button style={{padding:'15px 30px',margin:'10px 0' ,background:'orange',color:'white',border:'none',fontSize:'20px',fontWeight:'600'}}>BOOK NOW</button></a>
          </div>
        </div>
        <div style={{display:'flex', gap:'1rem', margin:'0.5rem 0'}}>
          {images?.map((pic) => (
            <img src={pic} onClick={()=> setImg(pic)} width="100px" height="70px"/>
          ))}
        </div>
      </div>
      )}

      {/* Select Booking Type */}
      <div style={{width:'60%', marginTop:'5rem'}} id='book'>
      {user ? (
        <>
        <h2 style={{color:'darkgreen', margin:'0'}}>Select booking Type:</h2>
        <div style={{display:'flex', margin:'2rem 0', gap:'2px'}}>
          <button onClick={handleIndividual} style={{background: isIndividualActive ? 'orange': '', color: isIndividualActive ? 'white': '', padding:'10px', border:'none', borderRadius:'1px', fontSize:'17px', cursor:'poniter'}} className="type-btn">Individual</button>
          <button onClick={handleCorporate} style={{background: isCorprateActive ? 'orange': '', color: isCorprateActive ? 'white': '', padding:'10px', border:'none', borderRadius:'1px', fontSize:'17px', cursor:'poniter'}} className="type-btn">Corporate</button>
        </div>
        </>
      ) : ('Please login')}
      

      {/* Individual */}
      {isIndividualActive && (
        <div style={{display:'flex', alignItems:'flex-start', justifyContent:'flex-start'}}>
        <form onSubmit={handlePayment} style={{boxShadow:'0px 0px 15px rgba(0,0,0,0.8)', padding:'2rem', width:'100%'}}>
          <h3 style={{color:'darkgreen', margin:'0'}}>Add Booking Enquiry</h3>
          <hr style={{border:'1px solid gray', height:'0', borderTop:'none'}}/>
          <div style={{display:'flex', flexDirection:'column', gap:'20px', margin:'20px 0',}}>
            <TextField variant='outlined' value={user?.name} label="Enquirer's Name" fullWidth/>
            <TextField variant='outlined' value={user?.email} type='email' label='Email' name='email' fullWidth/>
            <TextField variant='outlined' value={user?.number} type='tel' label='+ 91' name='number' fullWidth/>
            <TextField variant='outlined' onChange={handleChange} value={bookingData.players} type='number' inputProps={{ maxLength: 15 }} label='Players' name='players' fullWidth/>
            <TextField variant='outlined' onChange={handleChange} name='address' value={bookingData.address} label='Your Address' fullWidth multiline rows={4} required/>
            <TextField variant='outlined' onChange={handleChange} name='date' value={bookingData.date} type='date' placeholder='Date' fullWidth required inputProps={{
              min: new Date().toISOString().substr(0, 10),
            }}/>
            <TextField variant='outlined' label="Your Turf" value={bookingData.turfName} name='turfName' fullWidth required/>
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
            <Select value={bookingData.sportType} name='sportType' onChange={handleChange} labelId="time-slot-select-label" fullWidth>
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
          <form onSubmit={handlePayment} style={{boxShadow:'0px 0px 15px rgba(0,0,0,0.8)', padding:'2rem', width:'100%'}}>
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
              <TextField variant='outlined' label="Your Turf" value={corporateBooking.turf} name='turf' fullWidth required/>
              <TextField variant='outlined' value={user?.name} label="Enquirer's Name" name='enquirer' fullWidth/>
              <TextField variant='outlined' value={user?.email} type='email' label='Email' name='email' fullWidth/>
              <TextField variant='outlined' value={user?.number} type='tel' label='+ 91' name='number' fullWidth/>
              <TextField variant='outlined' onChange={handleChangeCorprate} value={corporateBooking.company} label='Company name' name='company' fullWidth/>
              <TextField variant='outlined' onChange={handleChangeCorprate} type='number' value={corporateBooking.players} inputProps={{ maxLength: 15 }} label='Players' name='players' fullWidth/>
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
        <h2 style={{fontFamily:'fantasy',letterSpacing:'1px',color:'#33d664'}}>Rules:</h2>
       
        </div>
        <div style={{fontFamily:'sans-serif',letterSpacing:'1px',lineHeight:'40px'}}>
          <li>Follow safety procedures.</li>
          <li>No Spitting.</li>
          <li>No smoking, alcohol, or drugs.</li>
          <li>No pets except service animals.</li>
          <li>Owner may cancel or reschedule.</li>
          <li>Authorized use only.</li>
        </div>
        

      </div>
    </div>
  )
}

export default Book