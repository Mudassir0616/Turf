import React from 'react'
import { Link } from 'react-router-dom'
import map from '../images/mumbai.jpg'
import search from '../images/search.png'
import book from '../images/book.png'
import play from '../images/play.png'
import discount from '../images/discount.jpeg'
import pals from '../images/meet-pals.png'

const Home = () => {
  
  return (
    <div>
      <div className="main-frame">
        <div style={{position:'absolute', top:'20%', left:'10%', width:'400px', background:'none', zIndex:'40', lineHeight:'54px'}}>
          <h1 style={{fontSize:'60px', color:'white', display:'flex', flexWrap:'wrap', margin:'10px 0', letterSpacing:'4px', fontWeight:'900', fontFamily:'sans-serif'}}>YOUR NEAREST TURF</h1>
          <h2 style={{fontSize:'26px', color:'darkgreen', margin:'0'}}>IS JUST A TAP AWAY</h2>
          <Link to={'/book'}>
          <button className="sign-btn">To Book Venue</button>
          </Link>
        </div>
      </div>
      
      {/* City Map */}
      <div style={{display:'flex', justifyContent:'center'}} className="city">
        <div >
          <img src={map}/>
          
        </div>
        <div style={{  background:'rgb(113,206,126)', display:'flex', justifyContent:'center', flexDirection:'column', paddingLeft:'20px'}}>
          <h2 style={{margin:'7px', color:'#060b1e', fontSize:'30px'}}>PLAYSPOTS HAS</h2>
          <h1 style={{fontSize:'55px', margin:'0', color:'white', lineHeight:'50px'}}>100+USERS ACROSS MUMBAI</h1>
          <p style={{color:'#060b1e', marginTop:'10px', fontWeight:'600'}}>JOIN WITH THE LARGEST <br /> SPORTS GROUND MANAGEMENT SOLUTION</p>
          
        </div>
      </div>

      {/* Options */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'7rem 2rem', background:'white'}}>
        <div style={{width:'350px', height:'200px', display:'flex', alignItems:'center', justifyContent:'flex-start', fontFamily:'cursive', flexDirection:'column', textAlign:'center'}}>
          <img src={search} width='60px' />
          <p style={{fontSize:'24px', margin:'10px 0'}}>Search</p>
          <p style={{margin:'0', fontSize:'16px', color:'gray'}}>Are you looking to play after work, organize your Sunday Five's football match? Explore the largest network of sports facilities whole over the India</p>
        </div>
        <div style={{width:'350px', height:'200px', display:'flex', alignItems:'center', justifyContent:'flex-start', fontFamily:'cursive', flexDirection:'column', textAlign:'center'}}>
          <img src={book} width='50px' />
          <p style={{fontSize:'24px', margin:'10px 0'}}>Book</p>
          <p style={{margin:'0', fontSize:'16px', color:'gray'}}>Once you’ve found the perfect ground, court or gym, Connect with the venue through the Book Now Button to make online booking & secure easier payment</p>
        </div>
        <div style={{width:'350px', height:'200px', display:'flex', alignItems:'center', justifyContent:'flex-start', fontFamily:'cursive', flexDirection:'column', textAlign:'center'}}>
          <img src={play} width='55px' />
          <p style={{fontSize:'24px', margin:'10px 0'}}>Play</p>
          <p style={{margin:'0', fontSize:'16px', color:'gray'}}>You’re the hero, you’ve found a stunning turf or court, booked with ease and now its time to play. The scene is set for your epic match.</p>
        </div>
      </div>

      {/* banner -3 */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-around', background:'rgb(235, 235, 235)', padding:'4rem 0'}}>
        <div style={{width:'500px'}}>
          <h1 style={{fontSize:'50px', letterSpacing:'2px', textTransform:'uppercase', margin:'0', lineHeight:'55px'}}>Much Sports Add In your Daily Life</h1>
          <p style={{margin:'10px 0', color:'gray'}}>Playspots is an online platform to connect sports facilities to its users, We're breaking down barriers to getting more people active</p>
        </div>
        <div>
          <img src={discount} width='350px'/>
        </div>
      </div>

      {/* meet your pals */}
      <div style={{display:'flex', alignItems:'flex-start', justifyContent:'space-around', padding:'3rem 0', lineHeight:'14px'}} className="background">
        <div style={{width:'500px'}}>
          <h1 style={{fontSize:'51px', letterSpacing:'3px', textTransform:'uppercase', marginTop:'4rem', lineHeight:'55px', color:'rgb(30, 30, 30)'}}>Meet your pals over game <span style={{color:'white'}}>& create best moments of life</span> </h1>
        </div>
        <div>
          <img src={pals} alt={pals} width="350px"/>
        </div>
      </div>
    </div>
  )
}

export default Home