import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import mainSlice, { getAllBookingsDoctor, getSpecificPatient, prescribePatient, setError } from '../slices/mainSlice'

export default function DoctorsProfile() {
  let state = useSelector(state => state.mainSlice)
  let dispatch = useDispatch(mainSlice)
  let [displayPopup,setDisplayPopup] = useState(false)
  let [idOfViewedConst,setId] = useState(null)
  let prescriptionRef = useRef()
  let notesRef = useRef()
  useEffect(() => {
    if (state.profile) {
      dispatch(getAllBookingsDoctor(state.profile.id)).then(() => console.log("success")).catch((err)=>dispatch(setError(err.message)))
    }
  }, [])
  useEffect(()=>{
    console.log(state.currPatient)
  },[state.currPatient])
  return (
    <div>
      <div style={{display:displayPopup?"flex":"none"}} className="popup box">
        <button onClick={()=>setDisplayPopup(false)} className='close-btn nav-btn'>
          X
        </button>
        <p>{state.currPatient?state.currPatient.name:null}</p>
        <div className="history">
          <div className="box">
            <p>Diseases</p>
          {state.currPatient?JSON.parse(state.currPatient.pastDiseases).map(dis=>{
            return <div className="centered-row">
              <p>Name:{dis.disease}</p>
              <p>For:{dis.years} years</p>
            </div>
            }):null}
            </div>
        </div>
        <p>Prescription</p>
        <input ref={prescriptionRef} type="text" />
        <p>Doctor Notes</p>
        <input ref={notesRef} type="text" />
        <button className='submit-btn' onClick={()=>{
          if(prescriptionRef.current.value.length>0&&notesRef.current.value.length>0){
            dispatch(prescribePatient({values:{prescription:prescriptionRef.current.value,doctor_notes:notesRef.current.value},id:idOfViewedConst})).then(()=>setDisplayPopup(false)).catch((err)=>dispatch(setError(err.message)))
          }
        }} >Prescribe</button>
      </div>
      <div className='consultations-container' >
        {state.consultationsToDisplay === "upcoming" ? state.upcomingConsultations.map(cons =>
          <div className='const-card' >
            <p>{cons.patient_name?`Name:${cons.patient_name}`:null}</p>
            <p>Meeting Time: {Object.keys(JSON.parse(cons.date))[0].split("00:")[0]} {Object.values(JSON.parse(cons.date))[0][0]} to {Object.values(JSON.parse(cons.date))[0][1]}</p>
            <button style={{display:new Date()>new Date(Object.keys(JSON.parse(cons.date))[0])?"":"none"}} onClick={()=>{
              dispatch(getSpecificPatient(cons.patient)).then(()=> setDisplayPopup(true)).catch((err)=>dispatch(setError(err.message)))
              setId(cons.id)
              }}>View Patient History and Prescribe</button>
          </div>
        ) : state.pastConsultations.map(cons =>
          <div className="const-card">
            <p>{cons.patient_name?`Name:${cons.patient_name}`:null}</p>
            <p> Meeting Time: {Object.keys(JSON.parse(cons.date))[0].split("00:")[0]} {Object.values(JSON.parse(cons.date))[0][0]} to {Object.values(JSON.parse(cons.date))[0][1]}</p>
            <p>Prescription:{cons.prescription}</p>
            <p>Notes:{cons.doctor_notes}</p>
            <p>{cons.feedback?`Feedback:${cons.feedback}`:null}</p>
            <p>{cons.rating?`Rating:${cons.rating}`:null}</p>
          </div>
        )}

      </div>
    </div>
  )
}
