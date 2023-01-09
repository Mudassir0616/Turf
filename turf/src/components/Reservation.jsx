import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import moment from 'moment'
import DeleteIcon from '@mui/icons-material/Delete';

const Reservation = () => {
    const url = 'http://localhost:4001/booking'
    const [data, setdata] = useState([])
    const user = useState(JSON.parse(localStorage.getItem('userProfile')))

    const bookingData = async()=>{
        const { data } = await axios.get(url)
        setdata(data)
    }

    useEffect(()=>{
        bookingData()
    },[])


    const handleDelete = async(id, index)=>{
        await axios.delete(`${url}/${id}`)
        data.splice(index, 1)
        setdata([...data])
    }

    console.log("page data", data);
    console.log("user", user && user[0].admin);

  return (
    <div className='table'>
        {user && user[0].admin ? (
        <table style={{borderCollapse:'collapse', width:'100%'}}>
            <tr>
                <th>Name</th>
                <th>email</th>
                <th>Address</th>
                <th>Sport</th>
                <th>Players</th>
                <th style={{textAlign:'center'}}>Date</th>
                <th>Timing</th>
                <th>Price</th>
                <th>Cancel</th>
            </tr>
            {data?.map((booking, index)=>(
                <tr key={booking?._id}>
                    <td style={{textTransform:'capitalize'}}>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.address}</td>
                    <td>{booking.sport}</td>
                    <td style={{textAlign:'center'}}>{booking.players}</td>
                    <td>{moment(booking.date).format('MM/DD/YYYY')}</td>
                    <td>{booking.time}</td>
                    <td>₹{booking.price}</td>
                    <td style={{textAlign:'center', cursor:'pointer'}} onClick={() => handleDelete(booking._id, index)}><DeleteIcon/></td>
                </tr>
            ))}
        </table>
        ):
        (
        <div style={{margin:'auto'}}>
        <span style={{color:'red', fontSize:'25px'}}>
            Something is wrong !!! <br/>Cannot have access to this route
        </span>
        </div>
        )}
    </div>
  )
}

export default Reservation