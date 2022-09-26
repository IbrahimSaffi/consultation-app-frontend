import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import mainSlice, { bookDoctor, calculateAvailableSlots, getAllBookingsDoctor, setError } from '../slices/mainSlice'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export default function BookingPopUp(props) {
  const [value, onChange] = useState(new Date());
  let dispatch = useDispatch(mainSlice)
  const [selectedChip, setChip] = useState(null)
  let state = useSelector(state => state.mainSlice)
  console.log(state.bookedSlots)
  useEffect(() => {
    if (value) {
      console.log(value)
      dispatch(calculateAvailableSlots(value))
    }
  }, [value])
  useEffect(() => {
    if (state.currentDoctor) {
      dispatch(getAllBookingsDoctor(state.currentDoctor.id)).catch((err)=>dispatch(setError(err.message)))
    }
  }, [state.currentDoctor])
  return (
    <div style={{ display: props.display ? "flex" : "none" }} className='popup box' >
      <div className="booking-container">
        <div className='calender-container' >
          <Calendar onChange={onChange} value={value} />
        </div>
        <div className="chips-container">
          <h2>Available Slots</h2>
          <div className="chips">
        <button className='close-btn nav-btn' onClick={() => props.setPopup(false)} >X</button>
        {state.currSlotChips.map((chip, i) => <button className='chip-btn' disabled={state.bookedSlots.hasOwnProperty(value) && state.bookedSlots[value].some(slotTime => slotTime[0] === chip[0] && slotTime[1] === chip[1])} onClick={() => setChip(i)} style={{ backgroundColor: i === selectedChip ? 'green' : "" }} >{chip[0]}-{chip[1]}</button>)}
          </div>
        </div>
      </div>
      <button className='submit-btn' onClick={() => {
        let values = {}
        let dateObj = {}
        dateObj[value] = state.currSlotChips[selectedChip]
        values.date = JSON.stringify(dateObj)
        values.patient = state.profile.id
        values.doctor = state.currentDoctor.id
        dispatch(bookDoctor(values)).then(() => console.log("success")).catch((err)=>dispatch(setError(err.message)))
      }} >Book</button>
    </div>
  )
}
