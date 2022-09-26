import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import mainSlice, { getAllBookingsDoctor, setError } from '../slices/mainSlice'
import { useParams } from "react-router-dom"

export default function ViewDoctor() {
  let dispatch = useDispatch(mainSlice)
  let state = useSelector(state=>state.mainSlice)
  let index= useParams().id
  useEffect(()=>{
     if(index){
      dispatch(getAllBookingsDoctor(state.doctors[index].id)).then(()=>console.log("success")).catch(err=>dispatch(setError(err.message)))
      console.log(state.doctors[index])
     }
     
  },[])
  return (
    <div className='doctor-profile' >
      <h2>Profile Details</h2>
      <div className="profile-details box">
       <h2>{state.doctors[index].name}</h2>
       <p>Cost:{state.doctors[index].cost}</p>
       <p>Contact:{state.doctors[index].email}</p>
       <p>Experience:{state.doctors[index].experience}</p>
       <p>Location:{state.doctors[index].location}</p>
       <p>Qualifications:{state.doctors[index].qualifications.join(",")}</p>
       <p>Specialities:{state.doctors[index].specialities.join(",")}</p>
       <p>OverAll Ratinfs:{state.doctors[index].ratings}</p>
      </div>
      <h2>Feedbacks</h2>
      <div className="feedbacks">
      {state.feedbacksOfCurrDoc.map(feedback=><div className='box'><p>Review: {feedback[0]} </p> <p>Rating: {feedback[1]}/5</p> <hr /> </div>)}
      </div>
    </div>
  )
}
