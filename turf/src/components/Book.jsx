import { TextField } from '@mui/material'
import axios from 'axios'
import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Book = () => {

  const url = `http://localhost:4001/booking`

  const user = JSON.parse(localStorage.getItem('userProfile'))
  const [bookingData, setBookingData] = useState({ name: user?.name, email: user?.email, number: user?.phone, address:'', sport:'', players:'', date:'', time:'', price:'1700'})

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


  const handleChange =(e)=>{
    setBookingData({ ...bookingData, [e.target.name]: e.target.value})
  }

  const handleClear = ()=>{
    setBookingData({ name:'', email:'', number:'', address:'', sport:'', players:'', date:'', time:''})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    try {
      const postData = await axios.post(url, bookingData)
      console.log(postData)
      alert('Succesfully Booked')
      setBookingData({ name:'', email:'', number:'', address:'', sport:'', players:'', date:'', time:''})
      history.push('/dashboard')

    } catch (error) {
      alert(error?.response?.data?.message)
    }
  }

  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', margin:'40px 0'}}>
      <form onSubmit={handleSubmit}>
        {user ? (
          <article style={{border:'none',display:'flex', flexDirection:'column', padding:'30px',    borderRadius:'34px', boxShadow:'3px 5px 15px gray'}}>
          
          <input type="text" value={user?.name} name='name' placeholder=' Name' onChange={handleChange} /><br />

          <input type="email" value={user?.email} name='email' placeholder=' @gmail.com' onChange={handleChange} /><br />

          <input type="tel" value={user?.phone} placeholder=' +91' max='10' name='number' onChange={handleChange} /><br />

          <input type="text" value={bookingData.address} name='address' placeholder=' Address' onChange={handleChange}/><br />

          <label>Select a Sport: </label>
          <span>
          <input type="radio" name='sport' value='Football' onChange={handleChange}/><label>Football</label><br />
          <input type="radio" name='sport' value='Cricket' onChange={handleChange}/><label>Cricket</label><br />
          <input type="radio" name='sport' value='Basketball' onChange={handleChange}/><label>Basketball</label><br />
          <input type="radio" name='sport' value='Hockey' onChange={handleChange}/><label>Hockey</label><br />
          </span><br />

          <label>Number of players: </label><br />
          <TextField variant='filled' type="number" value={bookingData.players} name='players' onChange={handleChange}/><br />

          <label>
            <span style={{color:'red'}}> ( Please select a date after {new Date().toLocaleDateString()})</span>
          </label><br />
          <TextField variant='filled' type="date" value={bookingData.date} name='date' label='Select Date' onChange={handleChange} InputLabelProps={{ shrink: true }} InputProps={{inputProps: { min: `${currdate}` } }}/>
          <br/>

          <label><span style={{color:'red'}}>( Please select time after {currTime})</span></label><br />
          <TextField variant='filled' type="time" value={bookingData.time} name='time' label='Select Time' onChange={handleChange} InputLabelProps={{ shrink: true }} /><br />
          <br />

          <label>Book for: </label>&nbsp;
          <select name='price' value={bookingData.price} onChange={handleChange}>
          <option value="1700" >1h</option>
          <option value="2400" >2h</option> 
          <option value="3100">3h</option> 
          <option value="3800">4h</option>   
          </select><br /><br />

          <div>Booking price - <span style={{fontSize:'21px', color:'gary'}}>{bookingData.price && bookingData.price} ₹</span></div>
          <br /> <br /> &nbsp;
          <button type='submit'>Book</button>&nbsp;
           <button onClick={handleClear}>Clear</button>
          </article>

          
        ):
        (<div style={{textAlign:'center'}}>
        <span style={{color:'red', fontSize:'25px'}}> Please Sign Up or login to book your <br/> Reservation</span>
        </div>)}
      </form>
    </div>
  )
}

export default Book