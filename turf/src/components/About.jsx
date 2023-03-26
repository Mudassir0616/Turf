import React from 'react'
import logo from '../images/playspots.png'
import pals from '../images/meet-pals.png'
import profile from '../images/meet-pals.png'
import tour from '../images/meet-pals.png'
import cup from '../images/meet-pals.png'
const About = () => {
 
    return (
      <div>
        <div style={{background:'white',color:'green ',alignItems:'center',display:'flex',justifyContent:'center' ,flexDirection:'column'}}>
        <img src={logo} width='450px'  />
        <p style={{textAlign:'center',fontFamily:'sans-serif',fontSize:'40px',fontWeight:'600'}}>Victory Starts Here!!!</p>
        </div>
        {/* {1st part } */}
        <div style={{display:'flex',alignItems:'center',width:'100%'}}>
          <div style={{width:'40%',display:'flex',alignContent:'right',justifyContent:'flex-end'}}>
            <img src={pals} width='250px' />
          </div>
          <div style={{width:'60%',height:'70px',backgroundColor:'#33d664',paddingLeft:'40px',color:'whitesmoke',fontSize:'25px',fontWeight:'750',display:'flex',alignItems:'center'}}>
            <p>Find co-player</p>
          </div>
        </div>
        {/* {2nd part} */}
        <div style={{display:'flex',alignItems:'center',width:'100%'}}>
          <div style={{width:'60%',height:'70px',backgroundColor:'#33d664',paddingRight:'40px',color:'whitesmoke',fontSize:'25px',fontWeight:'750',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <p>Build your Profile</p>
          </div>
          <div style={{width:'40%',display:'flex',alignItems:'left',justifyContent:'flex-start'}}>
            <img src={profile} width='300px' />
          </div>
        </div>
        {/* {3rd part} */}
        <div style={{display:'flex',alignItems:'center',width:'100%'}}>
          <div style={{width:'40%',display:'flex',alignContent:'right',justifyContent:'flex-end'}}>
            <img src={tour} width='300px' />
          </div>
          <div style={{width:'60%',height:'70px',backgroundColor:'#33d664',paddingLeft:'40px',color:'whitesmoke',fontSize:'25px',fontWeight:'750',display:'flex',alignItems:'center'}}>
            <p>Join Tournaments</p>
          </div>
        </div>
        {/* {4th part} */}
        <div style={{display:'flex',alignItems:'center',width:'100%'}}>
          <div style={{width:'60%',height:'70px',backgroundColor:'#33d664',paddingRight:'40px',color:'whitesmoke',fontSize:'25px',fontWeight:'750',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <p>Be a Champion </p>
          </div>
          <div style={{width:'40%',display:'flex',alignItems:'left',justifyContent:'flex-start'}}>
            <img src={cup} width='300px' />
          </div>
        </div>
        <div style={{marginBottom:'3rem'}}>
         
          <h1 style={{margin:'2rem 3rem',color:'#33d664',fontSize:'2rem',fontFamily:'sans-serif',fontWeight:'900'}}>About Us</h1>


          <p style={{fontSize:'20px',margin:'5px 3rem',color:'#00008B',fontFamily:'sans-serif',fontWeight:'bold'}}>WHO ARE WE:</p>
          <p style={{margin:'0 3rem',fontSize:'15px',fontWeight:'bolder',fontFamily:'sans-serif',display:'flex',letterSpacing:'1px',alignItems:'center'}}>A couple of sporting fanatics just like our customers, trying to solve problems which have troubled us for years.</p>

          <p style={{fontSize:'20px',margin:'2rem 3rem 5px 3rem',color:'#00008B',fontFamily:'sans-serif',fontWeight:'bold'}}>WHAT WE BELIEVE IN:</p>
          <p style={{margin:'0 3rem',fontSize:'15px',fontWeight:'bolder',fontFamily:'sans-serif',display:'flex',letterSpacing:'1px',alignItems:'center'}}>We believe in the motto: "Live to Sport" because let's accept it, playing sports is pretty awesome. Plus it makes you feel awesome.</p>

          <p style={{fontSize:'20px',margin:'2rem 3rem 5px 3rem',color:'#00008B',fontFamily:'sans-serif',fontWeight:'bold'}}>WHAT WE WANT FROM YOU:</p>
          <p style={{margin:'0 3rem',fontSize:'15px',fontWeight:'bolder',fontFamily:'sans-serif',display:'flex',letterSpacing:'1px',alignItems:'center'}}>Become a part of our continuously growing family,and help us make GoTuf better over time.</p>

          <p style={{fontSize:'20px',margin:'2rem 3rem 5px 3rem',color:'#00008B',fontFamily:'sans-serif',fontWeight:'bold'}}>OUR VISION & MISSION:</p>
          <p style={{margin:'0 3rem',fontSize:'15px',fontWeight:'bolder',fontFamily:'sans-serif',display:'flex',letterSpacing:'1px',alignItems:'center'}}>Our vision is to be the leading online sports booking platform.Our mission is to empower sports enthusiasts worldwide to easily discover, book and manage their sports activities.</p>

          <p style={{fontSize:'20px',margin:'2rem 3rem 5px 3rem',color:'#00008B',fontFamily:'sans-serif',fontWeight:'bold'}}>WHAT ARE WE DOING HERE:</p>
          <p style={{margin:'0 3rem',fontSize:'15px',fontWeight:'bolder',fontFamily:'sans-serif',display:'flex',letterSpacing:'1px',alignItems:'center'}}>Solving issues like IDENTIFYING Sports Venues, Cash Payments, AVAILABILITY, Confirmed Bookings !!! Our innovation will take you from Discovery to Checkout in a matter of minutes.</p>

      </div>
      </div>
    )
}

export default About