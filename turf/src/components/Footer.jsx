import React from 'react'
import Logo from '../images/playspots.png'
import insta from '../images/instagram.png'
import facebook from '../images/facebook.png'
import linkedin from '../images/linkedin.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{backgroundColor:'#33d664', color:'white', fontFamily:'Calibri, sans-serif', padding:'1rem 0'}}>
    <div style={{display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'2rem', color:'white', fontFamily:'Calibri, sans-serif'}}>
      <div style={{width:'220px', textAlign:'left'}}>
        <img src={Logo} width='100px' style={{borderRadius:'8px'}}/>
        <p style={{fontSize:'17px', fontWeight:'600', margin:'10px 0 20px 0'}}>A Leading <br />Sports Venue Booking Website</p>
      </div>
      <div className='divider'></div>
      <div style={{width:'160px'}}>
        <ul style={{listStyle:'none', lineHeight:'25px', cursor:'pointer'}}>
          <Link to='/' style={{textDecoration:'none',color:'whitesmoke'}}><li>Home</li></Link>
          <Link to='/about' style={{textDecoration:'none',color:'whitesmoke'}}><li>About</li></Link>
          {/* <li>Connect with us</li> */}
         <Link to='/book' style={{textDecoration:'none',color:'whitesmoke'}}><li>Book a Turf</li></Link> 
        </ul>
      </div>
      <div className='divider'></div>
      <div style={{ width:'180px'}}>
        <ul style={{listStyle:'none', lineHeight:'25px', cursor:'pointer'}}>
          <Link to='/Faqs' style={{textDecoration:'none',color:'whitesmoke'}}><li>FAQ's</li></Link>
          <Link to={'/sitemap'}style={{textDecoration:'none',color:'whitesmoke'}}><li>Site Map</li></Link>
          <Link to={'/terms'}style={{textDecoration:'none',color:'whitesmoke'}}><li>Terms & Conditions</li></Link>
        </ul>
      </div>
      <div className='divider'></div>
      <div style={{width:'200px', paddingLeft:'30px'}}>
        { <p style={{fontSize:'19px', margin:'0'}}>Bandra West Mumbai-400050</p> }
        <p style={{fontSize:'16px', margin:'10px 0 2px 0'}}>+91 8928269170</p>
        <p style={{fontSize:'16px', margin:'0'}}>cezanneshaikh50@gmail.com</p>
      </div>
      <div className='divider'></div>
      <div style={{paddingLeft:'40px', width:'200px'}}>
        <h3 style={{margin:'0'}}>Join us and grow your team</h3>
        <h1 style={{margin:'10px 0'}}>Connect Us</h1>
        <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
          <a href='https://www.instagram.com/cezaass/'><img src={insta} alt="" width='25px' height="25px" style={{borderRadius:'50%'}} /></a>
          <a href='https://www.facebook.com/'><img src={facebook} alt="" width='25px' height="25px" style={{borderRadius:'50%'}} /></a>
         <a href='https://www.linkedin.com/feed/'> <img src={linkedin} alt="" width='25px' height="25px" style={{borderRadius:'50%'}} /></a>
        </div>
      </div>
    </div>
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', fontSize:'12px', letterSpacing:'1px', opacity:'0.9'}}>
      <p>Copyright © 2023.Designed by Cezanne  </p>
    </div>
    <hr style={{borderBottom:'2px solid darkgray', borderTop:'none'}}/>
    </footer>
  )
}

export default Footer