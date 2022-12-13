import axios from 'axios'
import React,{useState} from 'react'
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const initialState = { firstName:'', lastName:'', email:'', number:'', query:''}
const Contact = () => {
  const url = 'http://localhost:4001/contact'
  const [contact, setContact] = useState(initialState)

  const handleContact = (e)=>{
    setContact({...contact, [e.target.name]: e.target.value})
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
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-around'}}>
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
        </div>
        <div style={{display:'flex'}}>
      <form onSubmit={handleSubmit} className='contact-form'>
        <input type="text" name="firstName" placeholder=' First Name' onChange={handleContact} /><br /><br />
        <input type="text" name="lastName" placeholder=' Last Name' onChange={handleContact} /><br /><br />
        <input type="email" name="email" placeholder=' @gmail.com' onChange={handleContact} /><br /><br />
        <input type="text" name="number" placeholder=' +91' onChange={handleContact} /><br /><br />
        <input type="text" name="query" placeholder=' Query' onChange={handleContact} /><br /><br />
        <button type='submit'> Submit </button>
      </form>
      </div>
    </div>
  )
}

export default Contact