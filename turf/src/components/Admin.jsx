import axios from 'axios'
import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import KeyIcon from '@mui/icons-material/Key';
import { Avatar, Button, TextField } from '@mui/material'


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
        <span className='sign' style={{paddingTop:'10px'}}>Admin</span>
        
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'10px', padding:'1rem 0'}} className='mui'>
        <TextField type="text" name="email" label='@gmail.com' onChange={handleChange}/>
        <TextField type="password" name="password" label='password*' onChange={handleChange}/>
        </div>
        <div style={{borderRadius:'6px', width:'99%', margin:'10px 0'}}>
        <Button type='submit' variant='contained' color='error' fullWidth>Login</Button>
        </div>
        
      </form>

    </div>
    </div>
  )
}

export default Admin