import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import FileBase from 'react-file-base64'
import moment from 'moment'
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const Dashboard = () => {
    const  url = 'http://localhost:4001/profile'
    const user = JSON.parse(localStorage.getItem('userProfile'))
    const [first, setfirst] = useState([]);
    const [data, setData] = useState({id: user?.id, name: user?.name, email: user?.email, number: user?.number, userImg:'', admin: user?.admin})
    const [myBooking, setMyBooking] = useState([])
    const [isCorprateActive, setisCorprateActive] = useState(false)
    const [isIndividualActive, setisIndividualActive] = useState(true)
    const [corporateData, setCorporateData] = useState([])
    const [paySlip, setPaySlip] = useState([]);
    const [paymentModal, setPaymentModal] = useState(false);
    const [resumePDF, setResumePDF] = useState(null);
    const resumeRef = useRef(null);

    const onSubmit = async(e)=>{
       e.preventDefault() 
       try {
            if(user?.admin){
              const adminImg = await axios.patch(`http://localhost:4001/admin/${user?.id}`, data)
              localStorage.setItem('userProfile', JSON.stringify(adminImg?.data))
              // setAdmin(adminImg?.data)
              // await window.location.reload()
            }
            else{
              const userImg = await axios.post(url, data)
              localStorage.setItem('userProfile', JSON.stringify(userImg?.data))   
            }
            
        } catch (error) {
            console.log(error)
        }

        window.location.reload()
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
    console.log('userrrr',userCorporateBooking)
    // console.log('Chhhhannnngeeeddddd',data)

    const handlePaySlip = (booking) =>{
      setPaymentModal(prev => !prev)
      setPaySlip(booking)
      window.scrollBy(0, 300)
    }

    const downloadPDF = () => {
      const capture = document.querySelector('.receipt');
      
      html2canvas(capture, {scale: 1}).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('p', 'in', [5, 8]);
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
        
        doc.save('receipt.pdf');
      });
    }

  return (
    <div style={{backgroundColor:'whitesmoke', padding:'30px', position:'relative'}} className='background'>
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
                     ) : data.userImg ? (
                       <Button variant='contained' color='secondary' onClick={editProfile}>Change Profile</Button>
                     ) : ''
                 }
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
                   <TextField label='Phone' value={user?.number} fullWidth/>
                </div>
            {userBooking.length === 0 && userCorporateBooking.length === 0 ? (
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
                    <th style={{textAlign:'center'}}>Turf</th>
                    <th style={{textAlign:'center'}}>Phone</th>
                    <th style={{textAlign:'center'}}>Sport</th>
                    <th style={{textAlign:'center'}}>Date</th>
                    <th style={{textAlign:'center'}}>From</th>
                    <th style={{textAlign:'center'}}>To</th>
                    <th style={{textAlign:'center'}}>Price</th>
                    <th style={{width:'100px'}}>Payment Slip</th>
                    <th style={{textAlign:'center', width:'50px'}}>Cancel</th>
                  </tr>
                  {userBooking?.map((booking, index)=>(
                    <tr key={booking?._id}>
                      <td style={{textTransform:'capitalize', padding:'15px 10px'}}>{booking.name}</td>
                      <td>{booking.email}</td>
                      <td style={{textAlign:'center', textTransform:'capitalize'}}>{booking.turfName}</td>
                      <td style={{textAlign:'center'}}>{booking?.number?.toString()?.substring(0, 10)}</td>
                      <td style={{textAlign:'center'}}>{booking.sportType}</td>
                      <td style={{width:'90px', textAlign:'center'}}>{moment(booking.date).format('DD MMM')}</td>
                      <td style={{textAlign:'center'}}>{booking.from}</td>
                      <td style={{textAlign:'center'}}>{booking.to}</td>
                      <td style={{textAlign:'center'}}>₹{booking.price}</td>
                      <td style={{textAlign:'center', fontSize:'30px', cursor:'pointer'}} onClick={()=> handlePaySlip(booking)}><ReceiptLongIcon/></td>
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
                <th style={{textAlign:'center'}}>Turf</th>
                <th style={{textAlign:'center'}}>Sport</th>
                <th style={{textAlign:'center'}}>Phone</th>
                <th style={{textAlign:'center'}}>Date</th>
                <th style={{textAlign:'center', width:'60px'}}>Players</th>
                <th style={{textAlign:'center'}}>From</th>
                <th style={{textAlign:'center'}}>To</th>
                <th style={{width:'50px', textAlign:'center'}}>Price</th>
                <th style={{width:'100px'}}>Payment Slip</th>
                <th style={{width:'50px'}}>Cancel</th>
            </tr>
            {userCorporateBooking?.map((booking, index)=>(
                <tr key={booking?._id}>
                    <td style={{textTransform:'capitalize', padding:'15px 10px'}}>{booking.enquirer}</td>
                    <td style={{paddingLeft:'10px'}}>{booking.email}</td>
                    <td style={{paddingLeft:'13px'}}>{booking.company}</td>
                    <td style={{textAlign:'center', textTransform:'capitalize'}}>{booking.turf}</td>
                    <td style={{textAlign:'center'}}>{booking.sportsType}</td>
                    <td style={{textAlign:'center'}}>{booking?.number?.toString()?.substring(0, 10)}</td>
                    <td style={{width:'90px', textAlign:'center'}}>{moment(booking.date).format('DD MMM')}</td>
                    <td style={{textAlign:'center'}}>{booking.players}</td>
                    <td style={{textAlign:'center'}}>{booking.from}</td>
                    <td style={{textAlign:'center'}}>{booking.to}</td>
                    <td style={{textAlign:'center'}}>₹{booking.price}</td>
                    <td style={{textAlign:'center', fontSize:'30px', cursor:'pointer'}} onClick={()=> handlePaySlip(booking)}><ReceiptLongIcon/></td>
                    <td style={{textAlign:'center', cursor:'pointer'}} onClick={() => handleDeleteCorporate(booking._id, index)}><DeleteIcon/></td>
                </tr>
            ))}
        </table>
        )}
            </div>
          )}
        </div>
      </div>
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', padding:'20px 0'}} className='blur'>
      {paymentModal && (
        <div style={{width:'500px', borderRadius:'4px', zIndex:'999', boxShadow:'1px 1px 5px gray', background:'white', color:'black'}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'15px 20px 15px 20px', backgroundImage: 'linear-gradient(to top, #507ed4 0%, #4e71ad 100%)', color:'white', borderTopLeftRadius:'4px', borderTopRightRadius:'4px'}}>
            <h3 style={{margin:'0'}}>Payment Slip</h3>
            <p style={{margin:'0', cursor:'pointer'}} onClick={()=> setPaymentModal(false)}>Cancel</p>
          </div>
          <div style={{padding:'0 10px'}} className='receipt'>
          <center style={{margin:'20px 0', fontSize:'27px', fontWeight:'700', color:'#3cba92'}}>Receipt of Payment</center>
          <table style={{ borderCollapse:'collapse', width:'100%'}} className='payment'>
            <tr>
              <td>Name</td>
              <th>{paySlip?.name || paySlip?.enquirer}</th>
            </tr>
            <tr>
              <td>Email</td>
              <th>{paySlip?.email}</th>
            </tr>
            <tr>
              <td>{isCorprateActive ? 'Company': 'Address'}</td>
              <th style={{textTransform:'capitalize'}}>{paySlip?.company || paySlip?.address}</th>
            </tr>
            <tr>
              <td>Turf Name</td>
              <th style={{textTransform:'capitalize'}}>{paySlip?.turfName}</th>
            </tr>
            <tr>
              <td>Sports</td>
              <th style={{textTransform:'capitalize'}}>{paySlip?.sportType || paySlip?.sportsType}</th>
            </tr>
            <tr>
              <td>No. of Players</td>
              <th style={{textTransform:'capitalize'}}>{paySlip?.players}</th>
            </tr>
            
            <tr>
              <td>Date</td>
              <th style={{textTransform:'capitalize'}}>{moment(paySlip?.date).format('DD MMM YYYY')}</th>
            </tr>
            <tr>
              <td>Time</td>
              <th style={{textTransform:'capitalize'}}>{paySlip?.from} - {paySlip?.to}</th>
            </tr>
            <tr>
              <td>Total</td>
              <th style={{textTransform:'capitalize'}}>₹{paySlip?.price}</th>
            </tr>
            <tr>
              <td>No Booking Fee <br /> (offer valid till 26 june)</td>
              <th style={{textTransform:'capitalize'}}>₹ 0</th>
            </tr>
            <tr>
              <td>Sub Total</td>
              <th style={{textTransform:'capitalize'}}>₹{paySlip?.price}</th>
            </tr>
            <tr>
              <td>Payment</td>
              <th style={{textTransform:'capitalize'}}><TaskAltIcon/></th>
            </tr>
          </table>
          </div>
          <button style={{width:'100%', padding:'15px', backgroundImage: 'linear-gradient(to top, #507ed4 0%, #4e71ad 100%)', border:'none', color:'white', fontSize:'21px', fontWeight:'600', fontFamily:'monospace', cursor:'pointer', marginTop:'20px'}} onClick={downloadPDF}>
            Print a Copy
          </button>
        </div>
      )}
      </div>
    </div>
  )
}

export default Dashboard