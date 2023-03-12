import axios from 'axios'
import React,{useState} from 'react'
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, TextField } from '@mui/material';

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

      alert('Your response has been recorder, Thank you !!!')
      console.log(data)
      setContact({ firstName:'', lastName:'', email:'', number:'', query:'' })

    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', padding:'3rem', position:'relative'}}>
      <div className='queries'>
       <Accordion className='accordian'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-content"
          >
            <p className='faq-que'>
              How to Sign-Up ?
            </p>
          </AccordionSummary>
            <AccordionDetails>
              <p className='faq-ans'>
                If you haven't already created account, please SignUp 
              </p>
            </AccordionDetails>
        </Accordion>

        <Accordion className='accordian'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-content"
          >
            <p className='faq-que'>
              How
            </p>
          </AccordionSummary>
            <AccordionDetails>
              <p className='faq-ans'>
                If you haven't already created account, please SignUp 
              </p>
              <input type='date'/>
              
            </AccordionDetails>
        </Accordion>

        <Accordion className='accordian'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-content"
          >
            <p className='faq-que'>
              How to Sign-Up ?
            </p>
          </AccordionSummary>
            <AccordionDetails>
              <p className='faq-ans'>
                If you haven't already created account, please SignUp 
              </p>
            </AccordionDetails>
        </Accordion>

        <Accordion className='accordian'>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel-content"
          >
            <p className='faq-que'>
              How to Sign-Up ?
            </p>
          </AccordionSummary>
            <AccordionDetails>
              <p className='faq-ans'>
                If you haven't already created account, please SignUp 
              </p>
            </AccordionDetails>
        </Accordion>

    </div>

    <div style={{flex:1, padding:'10px 0',}}>
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
    </div>
      
    </div>
  )
}

export default Contact