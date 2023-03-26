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
    const [isCorprateActive, setisCorprateActive] = useState(false)
    const [isIndividualActive, setisIndividualActive] = useState(true)
    const [corporateData, setCorporateData] = useState([])
    const [filterCorporate, setFilterCorporate] = useState([])
    
    const user = useState(JSON.parse(localStorage.getItem('userProfile')))
    const columns = [
        { title: "Name", field: "name", },
        { title: "Email", field: "email", },
        { title: "Address", field: "address"},
        { title: "Sport", field: 'sportType' },
        { title: "Players", field: "players" },
        { title: "Date", field: 'date' },
        { title: "From", field: "from" },
        { title: "T0", field: "to" },
        { title: "Price", field: 'price' },
    ]

    const corporate = [
        { title: "Enquirer", field: "enquirer", },
        { title: "Email", field: "email", },
        { title: "Sport", field: 'sportsType' },
        { title: "Phone", field: 'number' },
        { title: "Players", field: "players" },
        { title: "Date", field: 'date' },
        { title: "From", field: "from" },
        { title: "T0", field: "to" },
        { title: "Price", field: 'price' },
    ]

    const handleCorporate = ()=>{
        setisCorprateActive(true);
        setisIndividualActive(false)
       
    }
    const handleIndividual = ()=>{
        setisIndividualActive(true);
        setisCorprateActive(false)
        
    }
    const bookingData = async()=>{
        const { data } = await axios.get(url)
        setdata(data)
        setFilteredData(data)
    }

    const corporateBookings = async ()=>{
        const { data } = await axios.get(`http://localhost:4001/corporate-booking`)
        setCorporateData(data)
    }
    
    useEffect(()=>{
        bookingData();
        corporateBookings()
    },[])

    console.log(filteredData)
    
    
    const handleDelete = async(id, index)=>{
        await axios.delete(`${url}/${id}`)
        data.splice(index, 1)
        setdata([...data])
    }

    const handleDeleteCorporate = async(id, index)=>{
        await axios.delete(`http://localhost:4001/corporate-booking/${id}`)
        corporateData.splice(index, 1)
        setCorporateData([...corporateData])
    }
    
    const downloadPdf = () => {

        if(isIndividualActive){
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

        if(isCorprateActive){
            const doc = new jsPDF('portrait', 'mm', 'a3')
            doc.text("Corporate Booking Details", 20, 10)
            doc.autoTable({
              theme: "grid",
              columns: corporate.map(col => ({ ...col, dataKey: col.field })),
              body: corporateData
            })
            doc.save('table.pdf')
            toast('PDF downloaded', {
                type:'success',
                position:'bottom-right'
            })
        }
        
    }

    // const downloadExcel=()=>{
    //     const newData= filteredData.map(row=>{
    //         delete row.tableData
    //       return row
    //     })
    //     const workSheet=XLSX.utils.json_to_sheet(newData)
    //     const workBook=XLSX.utils.book_new()
    //     XLSX.utils.book_append_sheet(workBook,workSheet,"Players")
    //     //Buffer
    //     let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
    //     //Binary string
    //     XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
    //     //Download
    //     XLSX.writeFile(workBook,"PlayersData.xlsx")

    //     toast('Excel sheet downloaded', {
    //         type:'success',
    //         position:'bottom-right'
    //     })
    // }
    
    const handleSearchChange = (e) => {

        if(isIndividualActive){
          setSearchTerm(e.target.value);
          setFilteredData(data.filter((item) => 
            Object.values(item).some((val) => 
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        ));
        } else if(isCorprateActive){
            setSearchTerm(e.target.value);
            setFilterCorporate(corporateData.filter((item) => 
              Object.values(item).some((val) => 
              val.toString().toLowerCase().includes(searchTerm.toLowerCase())
              )
          ));
        }
      }

      console.log(data)

  return (
    <div style={{padding:'0 1.5rem'}} className='table'>
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
        {/* <button 
         onClick={()=> downloadExcel()} 
         style={{ padding:'0.4rem 0.9rem', borderRadius:'2px', cursor:'pointer'}}
         className='export-btn'>
            Export to CSV
        </button> */}
        <TextField type='search' label='Search' onChange={handleSearchChange} fullWidth style={{margin:'0 1rem'}}/>
        </div>
        <div style={{display:'flex', margin:'2rem 0 1rem 1rem', gap:'2px'}}>
          <button onClick={handleIndividual} style={{background: isIndividualActive ? 'orange': '', color: isIndividualActive ? 'white': '', padding:'10px', border:'none', borderRadius:'1px', fontSize:'17px', cursor:'poniter'}} className="type-btn">Individual</button>
          <button onClick={handleCorporate} style={{background: isCorprateActive ? 'orange': '', color: isCorprateActive ? 'white': '', padding:'10px', border:'none', borderRadius:'1px', fontSize:'17px', cursor:'poniter'}} className="type-btn">Corporate</button>
        </div>
        {isIndividualActive && (
            <table style={{ borderCollapse:'collapse', width:'100%'}}>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Sport</th>
                <th>Phone</th>
                <th style={{textAlign:'center'}}>Date</th>
                <th>From</th>
                <th>To</th>
                <th>Price</th>
                <th>Cancel</th>
            </tr>
            {filteredData?.map((booking, index)=>(
                <tr key={booking?._id}>
                    <td style={{textTransform:'capitalize'}}>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.address}</td>
                    <td>{booking.sportType}</td>
                    <td style={{textAlign:'center'}}>{booking.number.toString().substring(0, 10)}</td>
                    <td style={{width:'90px', textAlign:'center'}}>{moment(booking.date).format('DD MMM')}</td>
                    <td>{booking.from}</td>
                    <td>{booking.to}</td>
                    <td>₹{booking.price}</td>
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
           
                <th>Sport</th>
                <th style={{textAlign:'center'}}>Phone</th>
                <th style={{textAlign:'center'}}>Date</th>
                <th style={{textAlign:'center'}}>Players</th>
                <th>From</th>
                <th>To</th>
                <th>Price</th>
                <th>Cancel</th>
            </tr>
            {corporateData?.map((booking, index)=>(
                <tr key={booking?._id}>
                    <td style={{textTransform:'capitalize'}}>{booking.enquirer}</td>
                    <td>{booking.email}</td>
                    <td>{booking.sportsType}</td>
                    <td style={{textAlign:'center'}}>{booking.number.toString().substring(0, 10)}</td>
                    <td style={{width:'90px', textAlign:'center'}}>{moment(booking.date).format('DD MMM')}</td>
                    <td style={{textAlign:'center'}}>{booking.players}</td>
                    <td>{booking.from}</td>
                    <td>{booking.to}</td>
                    <td>₹{booking.price}</td>
                    <td style={{textAlign:'center', cursor:'pointer'}} onClick={() => handleDeleteCorporate(booking._id, index)}><DeleteIcon/></td>
                </tr>
            ))}
        </table>
        )}
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