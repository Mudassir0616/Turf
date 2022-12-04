import axios from 'axios'
import moment from 'moment'
import React,{useState} from 'react'
import { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, TextField } from '@mui/material'



const Testimonials = () => {
    const url = 'http://localhost:4001/reviews'
    const name = JSON.parse(localStorage.getItem('userProfile'))?.name
    const state = {name, testimonial:''}

    const [review, setReview] = useState(state);
    const [currentId, setCurrentId] = useState(null);
    const [Data, setData] = useState([]);


    const handleChange = (e)=>{
        setReview({...review,[e.target.name]: e.target.value})
    }

    const handleSubmit = async(e)=>{

        if(currentId && currentId){
            await axios.patch(`${url}/${currentId}`, review)
            alert('Thank you for the feedback !!')
        } 
        else{

            if(review.testimonial.length == ''){
                alert('Please provide some Information !!!')
            } else{

        try {
            await axios.post(url, review) 

        } catch (error) {
            alert(error?.response.data)
        }
    }
        }

    }

    const handleEdit = (id, stats)=>{
        setCurrentId(id)
        setReview(stats)
    }
   
    const reviews = async()=>{
        const { data } = await axios.get(url)
        setData(data)
    }

    useEffect(()=>{
        reviews()
    },[])

    const handleDelete = async(id, index)=>{
        Data.splice(index, 1)
        await axios.delete(`${url}/${id}`)
        setData([...Data])
    }

    // console.log(review .testimonial)
    // console.log(currentId)
    return (
        <div style={{display:'flex', flexDirection:'column', flexWrap:'wrap', justifyContent:'center', alignItems:'center'}}>
            <h1 className='h1'> TESTIMONIALS </h1>
            <div className='hidden'></div><br /><br /><br />
        <div className='testimonials'>
        {Data?.map((review, index)=>(
            <article className='reviews' key={index}>
                <div style={{lineHeight:'10px', display:'flex',justifyContent:'space-between'}}>
                <div>
                  <p style={{fontSize:'21px', textTransform:'capitalize'}}>{review.name}</p>
                  <p style={{color:'gray'}}>{moment(review.date).startOf('ss').fromNow()}</p>
                </div>
                {name === review?.name && (
                <div style={{padding:'15px', cursor:'pointer'}}>
                <a href="#edit"><EditIcon onClick={()=> handleEdit(review._id, review)}/></a>&nbsp;&nbsp;&nbsp;
                <DeleteIcon onClick={()=>handleDelete(review._id, index)}/>
                </div>
                )}
                </div>
                <br />
                <p>{review.testimonial}</p>
            
            </article>
            ))}
        </div>
        {name && (
        <div style={{margin:'60px'}}>
        <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', alignItems:'center', width:'500px'}}>
            {/* <input type="text" name="testimonial" onChange={handleChange} placeholder=' Message'/><br /><br /> */}
            <TextField
              label='Add your Testimonial...' 
              variant='outlined' 
              fullWidth 
              multiline
              rows={4}
              name='testimonial'
              id='edit'
              value={review.testimonial}
              onChange={handleChange}/>
            &nbsp;
            <button variant='contained' type='submit'>Submit</button>
        </form>
        </div>
        )}
    </div>
  )
}

export default Testimonials