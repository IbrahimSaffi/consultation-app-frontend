import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import mainSlice, { getAllBookingsDoctor } from '../slices/mainSlice'

export default function  BookingPopUp(props) {
    let dispatch = useDispatch(mainSlice)
    let state = useSelector(state=>state.mainSlice)
   useEffect(()=>{
    if(state.currentDoctor){
        dispatch(getAllBookingsDoctor(state.currentDoctor.id))
    }
   },[state.currentDoctor])
  return (
    <div style={{display:props.display?"flex":"none"}} className='popup' >
     <p>Something</p>
     <button onClick={()=>props.setPopup(false)} >X</button>

    </div>
  )
}
