import axios from 'axios'
import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import KeyIcon from '@mui/icons-material/Key';
import { Avatar } from '@mui/material'


const initialState = { name:'', email:'', password:'', cPassword:''}

const Admin = () => {

    const url = 'http://localhost:4001/admin'

  const [formData, setformData] = useState(initialState)
  const history = useHistory()

//   const handleSwitch = ()=>{
//     setisLogin((prevIsLogin)=> !prevIsLogin )
//   }

  const handleSubmit = async(e)=>{
    e.preventDefault()

     try {
        const {data}= await axios.post(`${url}/signIn`,formData)
        localStorage.setItem('userProfile', JSON.stringify(data))
        history.push('/')
      
     } catch (error) {
      alert(error?.response?.data?.message)
     }

  }

  const handleChange = (e)=>{
    setformData({...formData, [e.target.name]: e.target.value})
  }
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center', margin:'40px 0' }}>
    <div style={{border:'none', padding:'20px 30px', borderRadius:'34px', boxShadow:'3px 5px 15px gray '}}>
      <form onSubmit={handleSubmit} className='form'>

        <Avatar className='avatar'>
          <KeyIcon/>
        </Avatar>
        <br />
        <span className='sign'>Admin</span>
        <br />
        <input type="text" name="email" placeholder='@gmail.com' onChange={handleChange}/><br />
        <input type="password" name="password" placeholder='password*' onChange={handleChange}/><br />
        <Link to={'/reset'} style={{textDecoration:'none'}}>
          <span style={{color:'#347C98'}}> Forgot Password ? </span>
        </Link>
        <br />
        <button type='submit' className='submit'>Login</button>
        <br />
      </form>

    </div>
    </div>
  )
}

export default Admin