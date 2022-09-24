import axios from 'axios'
import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const ResetPass = () => {
    const [reset, setReset] = useState(true)
    const [resetData, setResetData] = useState({ email:''})
    const [resetPassword, setResetPassword] = useState({email:'', code:'', password:''});
    const history = useHistory();

    const handleChange = (e)=>{
        setResetData({...resetData, [e.target.name]: e.target.value})
    }

    const handlePassword =(e)=>{
        setResetPassword({...resetPassword, [e.target.name]: e.target.value})
    }

    const handleOtpSent = async(e)=>{
        e.preventDefault()

        try {
            const { data } = await axios.post('http://localhost:4001/users/emailSent', resetData)
            setReset(false)
            setResetData({email:''})
            console.log(data)
            
        } catch (error) {
            alert(error.response.data)
        }
        
    }

    const passwordChanged = async(e)=>{
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:4001/users/resetPassword', resetPassword)
            
            if(data){
                alert('Your password has been changed successfully. Please Login again !!!')
    
                console.log("in the frontend data check", data)
                setResetPassword({email:'', code:'', password:''})
        
                history.push('/registration')
            } else{
                alert('Invalid OTP')
            }
            
        } catch (error) {
            alert(error?.response.data)   
        }

    }
  return (
    <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
        {reset ? (
        <form onSubmit={handleOtpSent}>
            
        <label>{reset ? 'Please enter you email': 'Please enter OTP'}</label><br /><br />
        
        <input type="email" name='email' onChange={handleChange} placeholder={reset ? '@gmail.com':'Enter OTP'}/>
            
        <br /><br />
            <button type='submit'>Get OTP</button>
            
            </form>
        ):(
            <form onSubmit={passwordChanged}>
            <input type="email" placeholder='@gmail.com' name='email' onChange={handlePassword}/><br /><br />
            <input type="text" placeholder='OTP' maxLength='4' name='code' onChange={handlePassword}/><br /><br />
            <input type="password" placeholder='Change Password' name='password' onChange={handlePassword}/><br /><br />
            {/* <input type="password" placeholder='Confirm Password'/><br /><br /> */}
            <button type='submit'>Submit</button>
            </form>
        )}
        <br /><br />
    </div>
  )
}

export default ResetPass