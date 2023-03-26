import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import FileBase from 'react-file-base64'
import moment from 'moment'
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const url = 'http://localhost:4001/profile'
    const user = JSON.parse(localStorage.getItem('userProfile'))
    const [first, setfirst] = useState([]);
    const [data, setData] = useState({id: user?.id, name: user?.name, email: user?.email, number: user?.phone, userImg:'', admin: user?.admin})
    const [myBooking, setMyBooking] = useState([])
    const [isCorprateActive, setisCorprateActive] = useState(false)
    const [isIndividualActive, setisIndividualActive] = useState(true)
    const [corporateData, setCorporateData] = useState([])

    const onSubmit = async(e)=>{
    //    e.preventDefault()
       
       try {
            if(user?.admin){
                const adminImg = await axios.patch(`http://localhost:4001/admin/${user?.id}`, data)
                localStorage.setItem('userProfile', JSON.stringify(adminImg?.data))
                // setAdmin(adminImg?.data)
                console.log('adminImggggggggggggg', adminImg)

            }
            else{
                const userImg = await axios.post(url, data)
                localStorage.setItem('userProfile', JSON.stringify(userImg))   
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const getProfiles = async()=>{
        const { data } = await axios.get(url)
        setfirst(data)
    }

    const getBooking = async()=>{
        const { data } = await axios.get('http://localhost:4001/booking')
        setMyBooking(data)
    }

    const getCorporate = async()=>{
      const { data } = await axios.get('http://localhost:4001/corporate-booking')
      setCorporateData(data)
  }

    const handleCorporate = ()=>{
      setisCorprateActive(true);
      setisIndividualActive(false)
     
  }
  const handleIndividual = ()=>{
      setisIndividualActive(true);
      setisCorprateActive(false)
      
  }

    useEffect(()=>{
        getProfiles()
        getBooking()
        getCorporate()
    },[])

    console.log(myBooking)

    const editProfile = async()=>{
        try {
            const patch = await axios.patch(`${url}/${userImage[0]?._id}`, data)
            localStorage.setItem('userProfile', JSON.stringify(patch?.data))   
            window.location.reload();
        } catch (error) {
            alert(error)
        }
    }
    
    const handleDelete = async(id, index)=>{
        await axios.delete(`http://localhost:4001/booking/${id}`)
        myBooking.splice(index, 1)
        setMyBooking([...myBooking])
    }
    
    const handleDeleteCorporate = async(id, index)=>{
      await axios.delete(`http://localhost:4001/corporate-booking/${id}`)
      corporateData.splice(index, 1)
      setCorporateData([...corporateData])
    }
    
    const userImage = first.filter(image => image.email === user?.email);
    
    const userBooking = myBooking.filter(booking => booking.email === user?.email);
    const userCorporateBooking = corporateData.filter(booking => booking.email === user?.email);
    console.log('userrrr',userBooking)
    console.log('Chhhhannnngeeeddddd',data)

  return (
    <div style={{backgroundColor:'whitesmoke', padding:'30px'}} className="background">
        <div style={{ backgroundColor:'whitesmoke', padding:'1rem 2rem'}}>
            <h2>MY <span style={{color:'#3e8e41'}}> DASHBOARD </span></h2>

            <div style={{display:'flex', gap:'20px', alignItems:'flex-end'}}>
                {/* PROFILE */}
                <div>
                    {user.admin ? (
                    <img src={data.userImg !== '' ? data?.userImg : user?.userImg} style={{width:'350px', borderRadius:'5px', height:'275px', objectFit:'contain', boxShadow: '1px 5px 5px lightGray'}}/> 
                    ) :(
                  <img src={data?.userImg === '' ? userImage[0]?.userImg : data?.userImg} alt={data?.userImg} style={{width:'350px', borderRadius:'5px', height:'275px', objectFit:'contain', boxShadow: '1px 5px 5px lightGray'}}/> 
                    )}     
                </div>

                <form onSubmit={onSubmit} className='dashboard-form'>
                <FileBase
                 type='file'
                 multiple={false}
                 onDone={({base64})=> setData({...data, userImg: base64})}
                 className='filebase'
                 />
                 <p>Acceptable formats( jpeg, png ) only,<br/>
                 Max file size is 500kb and min size 70kb</p>
                 {userImage.length === 0 ? (
                     <Button variant='contained' color='primary' type='submit'>Submit</Button>
                     ) : (
                     <Button variant='contained' color='secondary' onClick={editProfile}>Change Profile</Button>
                 )}
                </form>
            </div>
            <div style={{display:'flex', flexDirection:'column', margin:'50px 0'}}>
                {/* ACCOUNT INFORMATION */}
                <h3 style={{fontSize:'1.5rem'}}>ACCOUNT INFORMATION</h3> 
                <div style={{display:'flex', alignItems:'center', gap:'20px', marginBottom:'10px'}}>
                    <p style={{fontWeight:'500', fontSize:'1.2rem'}}>Application ID -</p>
                    <h4 style={{color:'gray'}}>{user?.id}</h4>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'10px', paddingRight:'9rem'}}>
                   <TextField label='Name' value={user?.name} fullWidth/>
                   <TextField label='E-mail' value={user?.email} fullWidth/>
                   <TextField label='Phone' value={user?.phone} fullWidth/>
                </div>
            {userBooking.length === 0 ? (
              <div style={{display:'flex', alignItems:'left', justifyContent:'center', textAlign:'left', flexDirection:'column', margin:'3rem 0 0 0'}}>
                <p style={{fontSize:'21px', margin:'0', color:'red'}}>No Bookings have been made</p>
                <Link to={'/book'} style={{textDecoration:'none', margin:'5px 0'}}>Book a Turf now!!!</Link>
              </div>
            ) : (
            <div style={{ gap:'20px', margin:'10px 0'}}>
              <div style={{display:'flex', margin:'2rem 0 1rem 1rem', gap:'2px'}}>
                <button onClick={handleIndividual} style={{background: isIndividualActive ? 'orange': '', color: isIndividualActive ? 'white': '', padding:'10px', border:'none', borderRadius:'1px', fontSize:'17px', cursor:'poniter'}} className="type-btn">Individual</button>
                <button onClick={handleCorporate} style={{background: isCorprateActive ? 'orange': '', color: isCorprateActive ? 'white': '', padding:'10px', border:'none', borderRadius:'1px', fontSize:'17px', cursor:'poniter'}} className="type-btn">Corporate</button>
              </div>
              {isIndividualActive && (
                <table style={{ borderCollapse:'collapse', width:'100%'}}>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th style={{width:'300px'}}>Address</th>
                    <th style={{textAlign:'center'}}>Sport</th>
                    <th style={{textAlign:'center'}}>Phone</th>
                    <th style={{textAlign:'center'}}>Date</th>
                    <th style={{textAlign:'center'}}>From</th>
                    <th style={{textAlign:'center'}}>To</th>
                    <th style={{textAlign:'center'}}>Price</th>
                    <th style={{textAlign:'center', width:'50px'}}>Cancel</th>
                  </tr>
                  {userBooking?.map((booking, index)=>(
                    <tr key={booking?._id}>
                      <td style={{textTransform:'capitalize', padding:'15px 10px'}}>{booking.name}</td>
                      <td>{booking.email}</td>
                      <td>{booking.address}</td>
                      <td style={{textAlign:'center'}}>{booking.sportType}</td>
                      <td style={{textAlign:'center'}}>{booking.number.toString().substring(0, 10)}</td>
                      <td style={{width:'90px', textAlign:'center'}}>{moment(booking.date).format('DD MMM')}</td>
                      <td style={{textAlign:'center'}}>{booking.from}</td>
                      <td style={{textAlign:'center'}}>{booking.to}</td>
                      <td style={{textAlign:'center'}}>₹{booking.price}</td>
                      <td style={{textAlign:'center', cursor:'pointer'}} onClick={() => handleDelete(booking._id, index)}><DeleteIcon/></td>
                    </tr>
                  ))}
                </table>
              )}
              
            {isCorprateActive && (
            <table style={{ borderCollapse:'collapse', width:'100%'}}>
            <tr>
                <th>Enquirer</th>
                <th>Email</th>
                <th>Company</th>
                <th style={{textAlign:'center'}}>Sport</th>
                <th style={{textAlign:'center'}}>Phone</th>
                <th style={{textAlign:'center'}}>Date</th>
                <th style={{textAlign:'center', width:'60px'}}>Players</th>
                <th style={{textAlign:'center'}}>From</th>
                <th style={{textAlign:'center'}}>To</th>
                <th style={{width:'50px', textAlign:'center'}}>Price</th>
                <th style={{width:'50px'}}>Cancel</th>
            </tr>
            {userCorporateBooking?.map((booking, index)=>(
                <tr key={booking?._id}>
                    <td style={{textTransform:'capitalize', padding:'15px 10px'}}>{booking.enquirer}</td>
                    <td style={{paddingLeft:'10px'}}>{booking.email}</td>
                    <td style={{paddingLeft:'13px'}}>{booking.company}</td>
                    <td style={{textAlign:'center'}}>{booking.sportsType}</td>
                    <td style={{textAlign:'center'}}>{booking.number.toString().substring(0, 10)}</td>
                    <td style={{width:'90px', textAlign:'center'}}>{moment(booking.date).format('DD MMM')}</td>
                    <td style={{textAlign:'center'}}>{booking.players}</td>
                    <td style={{textAlign:'center'}}>{booking.from}</td>
                    <td style={{textAlign:'center'}}>{booking.to}</td>
                    <td style={{textAlign:'center'}}>₹{booking.price}</td>
                    <td style={{textAlign:'center', cursor:'pointer'}} onClick={() => handleDeleteCorporate(booking._id, index)}><DeleteIcon/></td>
                </tr>
            ))}
        </table>
        )}
            </div>
          )}
        </div>
            
        </div>
    </div>
  )
}

export default Dashboard