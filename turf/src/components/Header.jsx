import React,{useEffect, useState} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Avatar, Button } from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment';
import Logo from '../images/playspots.png'
import axios from 'axios'

const Header = () => {
  const  url = 'http://localhost:4001/profile'
  const location = useLocation()
  const history = useHistory()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userProfile')))
  const [first, setfirst] = useState([])
  // console.log(user)
  
  const logout = ()=>{
    localStorage.clear()

    history.push('/registration')
    setUser(null)
  }

  const getProfiles = async()=>{
    const { data } = await axios.get(url)
    setfirst(data)
}

useEffect(()=>{
  getProfiles()
},[])

const userImage = first.filter(image => image.email === user?.email);
// console.log('uuuuusss',userImage)

  useEffect(()=>{

    // const token = user?.token

    // if(token){
    //   const decodedToken = decode(token)

    //   if( decodedToken.exp * 1000 < new Date().getTime() ) return logout()
    // }

    setUser(JSON.parse(localStorage.getItem('userProfile')))
  },[location])


  return (
    <nav className='header'>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-around'}}>
        <img src={Logo} alt={Logo} width='150px'/>

      <div className='links'>
        <ul>
          <Link to={'/'} style={{textDecoration:'none'}}>
            <li><p>Home</p></li>
          </Link>
          <Link to={'/about'} style={{textDecoration:'none'}}>
            <li><p>About</p></li>
          </Link>
          <Link to={'/testimonials'} style={{textDecoration:'none'}}>
            <li><p>Testimonials</p></li>
          </Link>
          <Link to={'/book'} style={{textDecoration:'none'}}>
            <li><p>Book Turf</p></li>
          </Link>
          {user?.admin === true && (
            <Link to={'/reservations'} style={{textDecoration:'none'}}>
            <li><p>All Bookings</p></li>
          </Link>
          )}
          <Link to={'/contact-us'} style={{textDecoration:'none'}}>
            <li><p>Contact Us</p></li>
          </Link>
        </ul>
       </div>
      </div>
      <div style={{display:'flex', flexWrap:'wrap',paddingRight:'20px', alignItems:'center'}}>
        <Link to='/chats'> 
          <CommentIcon style={{fontSize:'20px', color:'black', marginRight:'15px'}}/>
        </Link>
        {user && (
          <div style={{display:'flex',flexWrap:'wrap'}}>
            <span style={{display:'flex', alignItems:'center', justifyContent:'center', textTransform:'capitalize', fontSize:'17px', fontWeight:'500', cursor:'pointer', gap:'10px', marginRight:'15px'}}>
              <Link to={`/dashboard`} style={{textDecoration:'none'}}> 
              {user?.userImg ? (
                <img src={user?.userImg} width='45px' height='45px' style={{borderRadius:'50%', objectFit:'cover'}} />
              ) : (
                <img src={userImage[0]?.userImg} width='45px' height='45px' style={{borderRadius:'50%', objectFit:'cover'}}/>
              )}
              </Link>

            {user?.name}
            </span>
          </div>
        )}
        {user ? (
          <Button onClick={logout} variant='contained' color='error' style={{height:'40px'}}>Logout</Button>
        ): (
          <>
          <Link to={'/registration'} style={{textDecoration:'none'}}>
          <Button variant='contained' color='secondary'>Register</Button>
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link to={'/admin'} style={{textDecoration:'none'}}>
          <Button variant='contained' color='primary' style={{textDecoration:'none'}}>Admin</Button>
          </Link>
          </>
        )}
        
      </div>
    </nav>
  )
}

export default Header