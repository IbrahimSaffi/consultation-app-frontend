import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import mainSlice, { getAllBookingsPatient, rateDoctor, setError } from '../slices/mainSlice'

export default function PatientsProfile() {
  let dispatch = useDispatch(mainSlice)
  let state = useSelector(state => state.mainSlice)
  let [displayPopup, setDisplayPopup] = useState(false)
  let [indexdOfViewedConst, setIndex] = useState(null)
 let feedbackRef = useRef()
 let ratingRef = useRef()
  useEffect(() => {
    if (state.profile) {
      dispatch(getAllBookingsPatient(state.profile.id)).catch((err)=>dispatch(setError(err.message)))
    }
  }, [])
  return (
    <div>
      <div style={{ display: displayPopup ? "flex" : "none" }} className="popup box">
        <button onClick={() => setDisplayPopup(false)} className='close-btn nav-btn'>
          X
        </button>
        <p>Feedback</p>
        <input ref={feedbackRef} type="text" />
        <p>Rating</p>
        <input ref={ratingRef} type="number" max={5} />
        <button className='submit-btn' onClick={() => {
          if (feedbackRef.current.value.length > 0 && ratingRef.current.value.length > 0) {
            dispatch(rateDoctor({ values: { feedback: feedbackRef.current.value, rating: ratingRef.current.value }, id: state.pastConsultations[indexdOfViewedConst].id })).then(() => setDisplayPopup(false)).catch((err) => console.log(err))
          }
        }} >Rate</button>
      </div>
      <div className='consultations-container' >
      <div>{state.consultationsToDisplay === "upcoming" ? state.upcomingConsultations.map(cons => {
        return <div className="const-card box">
          <p>Meeting Time:{Object.keys(JSON.parse(cons.date))[0].split("00:")[0]} {Object.values(JSON.parse(cons.date))[0][0]} to {Object.values(JSON.parse(cons.date))[0][1]}</p>
        </div>
      }) : state.pastConsultations.map((cons,i) => {
        return <div className="const-card box">
          <p>Meeting Time: {Object.keys(JSON.parse(cons.date))[0].split("00:")[0]} {Object.values(JSON.parse(cons.date))[0][0]} to {Object.values(JSON.parse(cons.date))[0][1]}</p>
          <p>Prescription: {cons.prescription}</p>
          <p>Notes: {cons.doctor_notes}</p>
          {cons.feedback ? <p>Feedback:{cons.feedback} {cons.rating}/5</p> : <button onClick={() => {
            setIndex(i)
            setDisplayPopup(true)
            console.log(state.pastConsultations)
          }}>Rate Doctor</button>}
        </div>
      })}</div>
      </div>
    </div>
  )
}
