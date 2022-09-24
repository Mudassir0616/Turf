import axios from 'axios'
import moment from 'moment'
import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Book = () => {

  const url = `http://localhost:4001/booking`

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userProfile')))
  const [bookingData, setBookingData] = useState({ name:'', email:'', number:'', address:'', sport:'', players:'', date:'', time:''})
  const [price, setPrice] = useState("1700")
  const history = useHistory()
  
  let currTime = new Date();
  let hh = currTime.getHours();
  let min = currTime.getMinutes();
  let sec = currTime.getSeconds()

  currTime = `${hh} : ${min} : ${sec}`

  const handlePrice = (e)=>{ 
    setPrice(e.target.value);
    setBookingData({...bookingData, price})
  }
  
  const handleChange =(e)=>{
    setBookingData({ ...bookingData, price, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    
    const postData = await axios.post(url, bookingData)
    try {

      alert('You are booked')
      setBookingData({ })

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', margin:'40px 0'}}>
      <form onSubmit={handleSubmit}>
        {user ? (
          <article style={{border:'none',display:'flex', flexDirection:'column', padding:'30px',    borderRadius:'34px', boxShadow:'3px 5px 15px gray'}}>
          
          <input type="text" name='name' placeholder=' Name' onChange={handleChange} required/><br />

          <input type="email" name='email' placeholder=' @gmail.com' onChange={handleChange} required/><br />

          <input type="tel" placeholder=' +91' max='10' name='number' onChange={handleChange} required/><br />

          <input type="text" name='address' placeholder=' Address' onChange={handleChange}/><br />

          <label>Select a Sport: </label>
          <span>
          <input type="radio" name='sport' value='Football' onChange={handleChange}/><label>Football</label><br />
          <input type="radio" name='sport' value='Cricket' onChange={handleChange}/><label>Cricket</label><br />
          <input type="radio" name='sport' value='Basketball' onChange={handleChange}/><label>Basketball</label><br />
          <input type="radio" name='sport' value='Hockey' onChange={handleChange}/><label>Hockey</label><br />
          </span><br />

          <label>Number of players: </label><br />
          <input type="number" name='players' onChange={handleChange} min='7' max='15'/><br />

          <label>Select Date: 
            <span style={{color:'red'}}> ( Please select a date after {new Date().toLocaleDateString()})</span>
          </label><br />
          <input type="date" name='date' onChange={handleChange} min='2022-09-24' required/><br/>
          

          <label>Time: <span style={{color:'red'}}>( Please select time after {currTime})</span></label><br />
          <input type="time" name='time' onChange={handleChange} required/><br />
          <br />

          <label>Book for: </label>&nbsp;
          <select name='price' onChange={handlePrice} required>
          <option value="1700" >1h</option>
          <option value="2400" >2h</option> 
          <option value="3100">3h</option> 
          <option value="3800">4h</option>   
          </select><br /><br />

          <div>Booking price - <span style={{fontSize:'21px', color:'gary'}}>{price && price} ₹</span></div>
          <br /> <br /> &nbsp;
          <button type='submit'>Book</button>
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