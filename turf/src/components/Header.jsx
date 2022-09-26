import React,{useEffect, useState} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { Avatar } from '@mui/material'
import decode from 'jwt-decode'
import Logo from '../images/images.png'

const Header = () => {
  const location = useLocation()
  const history = useHistory()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userProfile')))
  console.log(user)
  
  const logout = ()=>{
    localStorage.clear()

    history.push('/registration')
    setUser(null)
  }

  useEffect(()=>{

    const token = user?.token

    // if(token){
    //   const decodedToken = decode(token)

    //   if( decodedToken.exp * 1000 < new Date().getTime() ) return logout()
    // }

    setUser(JSON.parse(localStorage.getItem('userProfile')))
  },[location])


  return (
    <nav className='header'>
      <div>
        <img src={Logo} width='200px'/>
      </div>

      <div className='links'>
        <ul>
          <Link to={'/'} style={{textDecoration:'none'}}>
            <li><h4>Home</h4></li>
          </Link>
          <Link to={'/about'} style={{textDecoration:'none'}}>
            <li><h4>About</h4></li>
          </Link>
          <Link to={'/testimonials'} style={{textDecoration:'none'}}>
            <li><h4>Testimonials</h4></li>
          </Link>
          <Link to={'/book'} style={{textDecoration:'none'}}>
            <li><h4>Book Turf</h4></li>
          </Link>
          {user?.admin === true && (
            <Link to={'/reservations'} style={{textDecoration:'none'}}>
            <li><h4>All Bookings</h4></li>
          </Link>
          )}
          <Link to={'/contact-us'} style={{textDecoration:'none'}}>
            <li><h4>Contact Us</h4></li>
          </Link>
        </ul>
      </div>
      <div style={{display:'flex', flexWrap:'wrap',paddingRight:'20px'}}>
        {user && (
          <div style={{display:'flex',flexWrap:'wrap'}}>
            <span style={{display:'flex', alignItems:'center', justifyContent:'center', textTransform:'capitalize', fontSize:'17px', fontWeight:'500'}}><Avatar></Avatar> &nbsp;&nbsp;
            {user?.name}</span>&nbsp;&nbsp;
          </div>
        )}
        {user ? (
          <button onClick={logout} style={{backgroundColor:'#348C31', color:'white', border:'none', padding:'0 15px', borderRadius:'6px', fontSize:'17px'}}>Logout</button>
        ): (
          <>
          <Link to={'/registration'}>
          <button style={{backgroundColor:'#348C31', color:'white', border:'none', padding:'10px 15px', borderRadius:'6px'}}>Register</button>
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link to={'/admin'}>
          <button style={{backgroundColor:'#348C31', color:'white', border:'none', padding:'10px 15px', borderRadius:'6px'}}>Admin</button>
          </Link>
          </>
        )}
        
      </div>
    </nav>
  )
}

export default Header