import React from 'react'
import Logo from '../images/playspots.png'
import insta from '../images/instagram.png'
import facebook from '../images/facebook.png'
import linkedin from '../images/linkedin.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{backgroundColor:'#152238', color:'whitesmoke', fontFamily:'Calibri, sans-serif', padding:'1rem 0'}}>
    <div style={{display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'2rem', color:'whitesmoke', fontFamily:'Calibri, sans-serif'}}>
      <div style={{width:'220px', textAlign:'left'}}>
        <img src={Logo} width='130px' />
        <p style={{fontSize:'17px', fontWeight:'600', margin:'10px 0 20px 0'}}>India's Leading <br />Sports Venue Booking Website</p>
      </div>
      <div className='divider'></div>
      <div style={{width:'160px'}}>
        <ul style={{listStyle:'none', lineHeight:'25px', cursor:'pointer'}}>
          <li>Home</li>
          <li>About</li>
          <li>Connect with us</li>
          <li>Book a Turf</li>
        </ul>
      </div>
      <div className='divider'></div>
      <div style={{ width:'180px'}}>
        <ul style={{listStyle:'none', lineHeight:'25px', cursor:'pointer'}}>
          <li>FAQ's</li>
          <Link to={'/sitemap'}><li>Site Map</li></Link>
          <li>Terms & Conditions</li>
        </ul>
      </div>
      <div className='divider'></div>
      <div style={{width:'200px', paddingLeft:'30px'}}>
        <p style={{fontSize:'19px', margin:'0'}}>Kerala startup mission campus UL Cyber Park Calicut, India</p>
        <p style={{fontSize:'16px', margin:'10px 0 2px 0'}}>+91 8086 601 731</p>
        <p style={{fontSize:'16px', margin:'0'}}>support@playspots.in</p>
      </div>
      <div className='divider'></div>
      <div style={{paddingLeft:'30px', width:'200px'}}>
        <h3 style={{margin:'0'}}>Join our network and grow your team</h3>
        <h1 style={{margin:'10px 0'}}>Connect Us</h1>
        <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
          <img src={insta} alt="" width='25px' height="25px" style={{borderRadius:'50%'}} />
          <img src={facebook} alt="" width='25px' height="25px" style={{borderRadius:'50%'}} />
          <img src={linkedin} alt="" width='25px' height="25px" style={{borderRadius:'50%'}} />
        </div>
      </div>
    </div>
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', fontSize:'12px', letterSpacing:'1px', opacity:'0.9'}}>
      <p>Copyright © 2023.Designed by softfruit.solutions | Company Registered as Easycommune Online Services Private Ltd</p>
    </div>
    <hr style={{borderBottom:'1px solid darkgray', borderTop:'none'}}/>
    </footer>
  )
}

export default Footer