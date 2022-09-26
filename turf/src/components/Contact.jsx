import axios from 'axios'
import React,{useState} from 'react'

const initialState = { firstName:'', lastName:'', email:'', number:'', query:''}
const Contact = () => {
  const url = 'http://localhost:4001/contact'
  const [contact, setContact] = useState(initialState)

  const handleContact = (e)=>{
    setContact({...contact, [e.target.name]: e.target.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(contact)
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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder=' First Name' onChange={handleContact} /><br /><br />
        <input type="text" name="lastName" placeholder=' Last Name' onChange={handleContact} /><br /><br />
        <input type="email" name="email" placeholder=' @gmail.com' onChange={handleContact} /><br /><br />
        <input type="text" name="number" placeholder=' +91' onChange={handleContact} /><br /><br />
        <input type="text" name="query" placeholder=' Query' onChange={handleContact} /><br /><br />
        <button type='submit'> Submit </button>
      </form>
    </div>
  )
}

export default Contact