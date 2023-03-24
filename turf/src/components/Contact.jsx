import axios from 'axios'
import React,{useState} from 'react'
import { Button, TextField } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import { toast, ToastContainer } from 'react-toastify';
const Contact = () => {
  const url = 'http://localhost:4001/contact'
  const userData = JSON.parse(localStorage.getItem('userProfile'))
  const firstName = userData?.name.split(' ')[0]
  const lastName = userData?.name.split(' ')[1]
  const initialState = { firstName, lastName, email: userData?.email, number: userData?.phone, query:''}
  const [contact, setContact] = useState(initialState)

  const handleContact = (e)=>{
    setContact(prev =>({...contact, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const { data } = await axios.post(url,contact)
    
    try {
      toast('Your Response has been recorded !', {
        type:'success',
        position:'bottom-right'
    })
      console.log(data)
      setContact({ firstName:contact.firstName, lastName:'', email: contact.email, number: contact.number, query: '' })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div >
      <ToastContainer/>
      <div>
        <h1 style={{display:'flex',alignContent:'center',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>Contact Us</h1>
      </div>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem 0'}}>
        <iframe width="95%" height="510" id="gmap_canvas" src="https://maps.google.com/maps?q=bella vista bandra west &t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        </div>
        <div style={{margin:'70px 40px', fontFamily:'sans-serif', fontSize:'17px', opacity:'0.8'}}>
          <h2 style={{fontWeight:'600',justifyContent:'left', letterSpacing:'1px', fontSize:'27px'}}><u>Contact Information</u></h2>
          <p style={{display:'flex' ,alignItems:'center'}}> <LocationOnIcon /> &nbsp;&nbsp; Bella Vista, Shree Sai Baba Building, Swami Vivekananda Rd, Bandra West, Mumbai, Maharashtra 400050</p>
          <p style={{display:'flex' ,alignItems:'center'}}> <PhoneIcon/>&nbsp;&nbsp; 8928269170 &nbsp;|| &nbsp;9870690220 &nbsp;||&nbsp;  9372022895 </p>
          <p style={{display:'flex' ,alignItems:'center'}}> <AccessTimeTwoToneIcon/>&nbsp;&nbsp; Mon – Fri : 8:00 AM to 9:00 PM</p>
          <p style={{display:'flex' ,alignItems:'center'}}> <MailTwoToneIcon/>&nbsp;&nbsp; cezanneshaikh50@gmail.com</p>
        </div>

        <form onSubmit={handleSubmit} style={{margin:'70px 40px', fontFamily:'sans-serif', fontSize:'17px', opacity:'0.8'}}>
          <h2 style={{fontWeight:'600',justifyContent:'left', letterSpacing:'1px', fontSize:'27px'}}>
            <u>Get In Touch With Us</u>
          </h2>
          <div style={{display:'flex', alignItems:'center', gap:'40px', margin:'30px 0'}}>
          <TextField variant='outlined' value={contact.firstName} name='firstName' label='First Name' required fullWidth/>
          <TextField variant='outlined' value={contact.email} name='email' label='E-mail' fullWidth/>
          <TextField variant='outlined' value={contact.number} name='number' label='+91' fullWidth/>
          </div>
          <TextField variant='outlined' value={contact.query} name='query' label='Message' onChange={handleContact} multiline rows={7} fullWidth required/>
          <Button type='submit' variant='contained' style={{margin:'20px 0'}}>Submit</Button>
        </form>

    {/* <div style={{flex:1, padding:'10px 0',}}>
      <form onSubmit={handleSubmit} className='contact-form'>
        <div style={{display:'flex', gap:'5px'}}>
        <TextField variant='standard' value={contact.firstName} name='firstName' label='First Name' required/>
        <TextField variant='standard' value={contact.lastName} name='lastName' label='Last Name' />
        </div>
        <TextField variant='standard' value={contact.email} name='email' label='E-mail' fullWidth/>
        <TextField variant='standard' value={contact.number} name='number' label='+91' fullWidth/>
        <TextField variant='standard' value={contact.query} name='query' label='Query ?' onChange={handleContact} multiline rows={5} fullWidth required/>
        <Button type='submit' variant='contained' fullWidth>Submit</Button>
      </form>
    </div> */}
      
    </div>
  )
}

export default Contact