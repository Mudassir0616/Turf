import axios from 'axios'
import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import KeyIcon from '@mui/icons-material/Key';
import { Avatar, Button, TextField } from '@mui/material'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState = { name:'', email:'',number:'', password:'', cPassword:''}

const Regsiter = () => {
  // localStorage.clear()
  const url = 'http://localhost:4001/users'

  const [formData, setformData] = useState(initialState)
  const [isLogin, setisLogin] = useState(false)
  const history = useHistory()

  const handleSwitch = ()=>{
    setisLogin((prevIsLogin)=> !prevIsLogin )
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()

     try {

      if(isLogin){
      const {data} = await axios.post(`${url}/signUp`,formData)
      localStorage.setItem('userProfile', JSON.stringify(data))
      history.push('/')
      toast('Successfully Signed Up')

      } else{
        const {data}= await axios.post(`${url}/signIn`,formData)
        localStorage.setItem('userProfile', JSON.stringify(data))
        history.push('/')
        toast('Successfully Signed In')
      }
     } catch (error) {
      toast(error?.response?.data?.message, {
        type:'error',
        position:'bottom-right'
      })
     }

    
    // localStorage.setItem('userData', JSON.stringify({...data}))

  }

  const handleChange = (e)=>{
    setformData({...formData, [e.target.name]: e.target.value})
  }
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center', margin:'40px 0' }}>
      <ToastContainer/>
    <div style={{border:'none', padding:'20px 30px', borderRadius:'34px', boxShadow:'3px 5px 15px gray'}}>
      <form onSubmit={handleSubmit} className='form'>

        <Avatar className='avatar'>
          <KeyIcon/>
        </Avatar>
        <br />
        {isLogin ? (<span className='sign'>Sign Up</span>):(<span className='sign'>Sign In</span>)}
        <br />
        {isLogin && (
          <>
        {/* <input type="text" name="name" placeholder='Name' onChange={handleChange} required/> */}
        <TextField label='Name' name='name' onChange={handleChange} required fullWidth/>
          </>
        )}<br/>
        <TextField label='@gmail.com' name='email' onChange={handleChange} required fullWidth/>&nbsp;
        {isLogin && <TextField label='+ 91' name='number' InputProps={{
          inputProps: {
          maxLength: 10,
          },
        }} onChange={handleChange} fullWidth/>}<br />
        <TextField label='Password' type='password' name='password' onChange={handleChange} required fullWidth/><br />
        {!isLogin && <Link to={'/reset'} style={{textDecoration:'none'}}><span style={{color:'#347C98'}}> Forgot Password ? </span></Link>}
        {isLogin && (
        <TextField label='Confirm Password' name='cPassword' type='password' onChange={handleChange} required fullWidth/>
        )}<br/>
        
        {/* <button type='submit' className='submit'>{isLogin ? 'Sign Up': 'Sign In'}</button> */}
        <Button type='submit' fullWidth variant='contained' color='secondary'>{isLogin ? 'Sign Up': 'Sign In'}</Button>
        <br />
      </form>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <button className='switch' onClick={handleSwitch}>{isLogin ? 'Already have an account? Sign In': `Don't have an account? Sign Up`}</button>
      </div>
    </div>
    </div>
  )
}

export default Regsiter