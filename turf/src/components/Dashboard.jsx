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
    // const [admin, setAdmin] = useState([])
    // console.log(data)
    // console.log('looocaalll',user)

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

    useEffect(()=>{
        getProfiles()
        getBooking()
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
    
    const userImage = first.filter(image => image.email === user?.email);
    
    const userBooking = myBooking.filter(booking => booking.email === user?.email);
    console.log(userBooking)
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
              <p style={{fontWeight:'500', fontSize:'1.2rem'}}>My Bookings </p>
              <table style={{ borderCollapse:'collapse', width:'100%', textAlign:'left'}}>
                <tr>
                  <th>Name</th>
                  <th>Email</th>          
                  <th style={{textAlign:'center'}}>Sport</th>
                  <th style={{textAlign:'center'}}>Players</th>
                  <th style={{textAlign:'center'}}>Date</th>
                  <th style={{textAlign:'center'}}>Timing</th>
                  <th style={{textAlign:'center'}}>Price</th>
                  <th style={{width:'10px'}}>Cancel</th>
                </tr>
                {userBooking?.map((booking, index)=>(
                  <tr key={booking?._id}>
                    <td style={{textTransform:'capitalize', paddingLeft:'10px'}}>{booking.name}</td>
                    <td style={{paddingLeft:'8px'}}>{booking.email}</td>
                    <td style={{textAlign:'center'}}>{booking.sport}</td>
                    <td style={{textAlign:'center'}}>{booking.players}</td>
                    <td style={{textAlign:'center'}}>{moment(booking.date).format('DD MMM')}</td>
                    <td style={{textAlign:'center'}}>{booking.time}</td>
                    <td style={{textAlign:'center'}}>₹{booking.price}</td>
                    <td style={{padding:'10px 0px ', cursor:'pointer', textAlign:'center'}} onClick={() => handleDelete(booking._id, index)}><DeleteIcon/></td>
                  </tr>
                ))}
              </table>
            </div>
            )}
        </div>
            
        </div>
    </div>
  )
}

export default Dashboard