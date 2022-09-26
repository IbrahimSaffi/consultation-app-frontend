import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useLocation} from 'react-router-dom';
import mainSlice, { setConsultaionMode } from '../slices/mainSlice';

export default function Header() {
  let goTo = useNavigate()
  let dispatch = useDispatch(mainSlice)
  let state = useSelector(state=>state.mainSlice)
  let location = useLocation()
  return (
    <div className='header' >
      <h1>Consultation App</h1>
      <div style={{display:location.pathname.includes("profile")?"flex":"none"}}  className="centered-row">
        <button className={state.consultationsToDisplay==="upcoming"? 'select-btn selected':"select-btn"}  onClick={()=>dispatch(setConsultaionMode("upcoming"))} >Upcoming</button>
        <button className={state.consultationsToDisplay!=="upcoming"? 'select-btn selected':"select-btn"} onClick={()=>dispatch(setConsultaionMode("past"))} >Past</button>
      </div>
      <div style={{display:!location.pathname.includes("login")&&!location.pathname.includes("signup")&&!location.pathname.includes("reset")?"flex":"none"}} className="centered-row">
        <button className='submit-btn' onClick={()=>goTo("/profile")} >View Profile</button>
        <button className='submit-btn' onClick={()=>goTo("/login")}>Logout</button>
      </div>

    </div>
  )
}
