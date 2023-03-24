import React from 'react'
import logo from '../images/playspots.png'

const About = () => {
 
    return (
      <div>
        <div style={{background:'white',color:'green ',alignItems:'center',display:'flex',justifyContent:'center' ,flexDirection:'column'}}>
        <img src={logo} width='450px'  />
        <p style={{textAlign:'center',fontFamily:'sans-serif',fontSize:'40px',fontWeight:'600'}}>Indias leading website </p>
        </div>
      </div>
    )
}

export default About