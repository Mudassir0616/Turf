import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import moment from 'moment'
import DeleteIcon from '@mui/icons-material/Delete';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import PrintIcon from '@mui/icons-material/Print';
import * as XLSX from 'xlsx'
import { TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Reservation = () => {
    const url = 'http://localhost:4001/booking'
    const [data, setdata] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    
    const user = useState(JSON.parse(localStorage.getItem('userProfile')))
    const columns = [
        { title: "Name", field: "name", },
        { title: "Email", field: "email", },
        { title: "Address", field: "address"},
        { title: "Sport", field: 'sport' },
        { title: "Players", field: "players" },
        { title: "Date", field: 'date' },
        { title: "Time", field: "time" },
        { title: "Price", field: 'price' },
    ]

    const bookingData = async()=>{
        const { data } = await axios.get(url)
        setdata(data)
        setFilteredData(data)
    }
    
    useEffect(()=>{
        bookingData()
    },[])
    
    
    const handleDelete = async(id, index)=>{
        await axios.delete(`${url}/${id}`)
        data.splice(index, 1)
        setdata([...data])
    }
    
    const downloadPdf = () => {
        const doc = new jsPDF('portrait', 'mm', 'a3')
        doc.text("Players Booking Details", 20, 10)
        doc.autoTable({
          theme: "grid",
          columns: columns.map(col => ({ ...col, dataKey: col.field })),
          body: filteredData
        })
        doc.save('table.pdf')
        toast('PDF downloaded', {
            type:'success',
            position:'bottom-right'
        })
    }

    const downloadExcel=()=>{
        const newData= filteredData.map(row=>{
            delete row.tableData
          return row
        })
        const workSheet=XLSX.utils.json_to_sheet(newData)
        const workBook=XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook,workSheet,"Players")
        //Buffer
        let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
        //Binary string
        XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
        //Download
        XLSX.writeFile(workBook,"PlayersData.xlsx")

        toast('Excel sheet downloaded', {
            type:'success',
            position:'bottom-right'
        })
    }
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setFilteredData(data.filter((item) => 
          Object.values(item).some((val) => 
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        ));
      }
    

    // console.log("page data", data);
    // console.log("user", user && user[0].admin);
    // const dateString = "1970-01-19T06:35:16.234Z";
    const convertToUTC = (api_date)=>{
        const date = moment.utc(api_date).utcOffset("+05:30");

const formattedDate = date.format("DD/MM/YYYY hh:mm:ss A");

    return formattedDate
    }

  return (
    <div className='table'>
        <ToastContainer/>
        {user && user[0].admin ? (
        <>
        <div style={{display:'flex', alignItems:'center', margin:'10px', gap:'7px', width:'80vw'}}>
        <PrintIcon/>
        <button 
         onClick={()=> downloadPdf()} 
         style={{ padding:'0.4rem 0.9rem', borderRadius:'2px', cursor:'pointer'}}
         className='export-btn'>
            Export to PDF
        </button>
        <button 
         onClick={()=> downloadExcel()} 
         style={{ padding:'0.4rem 0.9rem', borderRadius:'2px', cursor:'pointer'}}
         className='export-btn'>
            Export to CSV
        </button>

        <TextField type='search' label='Search' onChange={handleSearchChange} fullWidth style={{margin:'0 1rem'}}/>
        </div>
        <table style={{ borderCollapse:'collapse', width:'100%'}}>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Sport</th>
                <th>Players</th>
                <th style={{textAlign:'center'}}>Date</th>
                <th>Timing</th>
                <th>Price</th>
                <th>Cancel</th>
            </tr>
            {filteredData?.map((booking, index)=>(
                <tr key={booking?._id}>
                    <td style={{textTransform:'capitalize'}}>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.address}</td>
                    <td>{booking.sport}</td>
                    <td style={{textAlign:'center'}}>{booking.players}</td>
                    <td style={{width:'90px', textAlign:'center'}}>{convertToUTC(booking.date)}</td>
                    <td>{booking.time}</td>
                    <td>₹{booking.price}</td>
                    <td style={{textAlign:'center', cursor:'pointer'}} onClick={() => handleDelete(booking._id, index)}><DeleteIcon/></td>
                </tr>
            ))}
        </table>
        </>
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