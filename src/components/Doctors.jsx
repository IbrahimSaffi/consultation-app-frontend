import React, { useEffect, useRef, useState } from 'react'
import mainSlice, { getAllBookingsDoctor, getDoctors, setCurrentViewedDoctor, setError } from '../slices/mainSlice'
import { useSelector, useDispatch } from 'react-redux';
import Multiselect from 'multiselect-react-dropdown';
import BookingPopUp from './BookingPopUp';
import { useNavigate } from "react-router-dom"

export default function Doctors() {
  let state = useSelector(state => state.mainSlice)
  let dispatch = useDispatch(mainSlice)
  let searchInput = useRef()
  let locationRef = useRef()
  let qualificationsRef = useRef()
  let specialitiesRef = useRef()
  let [hovered, setHovered] = useState(null)
  let [filteredList, setFiltered] = useState([])
  let [locations, setLocation] = useState([])
  let [specialities, setSpecialities] = useState([])
  let [qualifications, setQualifications] = useState([])
  let [bookingDisplay,setBookingDisplay] = useState(false)
  let goTo = useNavigate()
  function filterLocations(query) {
    if (!query) {
      let locationsObj = {}
      state.doctors.forEach(doctor => locationsObj[doctor.location] = true)
      setLocation(Object.keys(locationsObj))
    }
    else {
      let tempLocationsArr = locations.slice()
      tempLocationsArr = tempLocationsArr.filter(location => location.toLowerCase().includes(query.toLowerCase()))
      setLocation(tempLocationsArr)
    }
  }
  function setSpecialitiesFunc() {
    let specialitiesObj = {}
    state.doctors.forEach(doctor => {
      if (doctor.specialities) {
        doctor.specialities.forEach(speciality => specialitiesObj[speciality] = true)
      }
    }
    )
    setSpecialities(Object.keys(specialitiesObj)) 
  }
  function setQualificationFunc() {
    let qualificationsObj = {}
    state.doctors.forEach(doctor => {
      if (doctor.qualifications) {
        doctor.qualifications.forEach(qualification => qualificationsObj[qualification] = true)
      }
    }
    )
    setQualifications(Object.keys(qualificationsObj))

  }
  function filter() {
    let UpdatedfilteredList = []
    let currList = [...state.doctors]
    UpdatedfilteredList = currList.filter((doctor => doctor.location.toLowerCase().includes(locationRef.current.value.toLowerCase()) && doctor.name.toLowerCase().includes(searchInput.current.value.toLowerCase())))
    //Qualifications Filter
    if (qualificationsRef.current.getSelectedItems().length > 0) {
     UpdatedfilteredList= UpdatedfilteredList.filter((doctor) => {
       return qualificationsRef.current.getSelectedItems().some(selected => {
          return doctor.qualifications.join(",").toLowerCase().includes(selected.name.toLowerCase())
        })
      })
    }
    if (specialitiesRef.current.getSelectedItems().length > 0) {
      UpdatedfilteredList= UpdatedfilteredList.filter((doctor) => {
        return specialitiesRef.current.getSelectedItems().some(selected => {
          //This extra condition(doctor.specialites) to be removed later as no doctor will be without specialities
           return doctor.specialities&&doctor.specialities.join(",").toLowerCase().includes(selected.name.toLowerCase())
         })
       })
     }
    setFiltered(UpdatedfilteredList)
  }
  useEffect(() => {
    dispatch(getDoctors()).catch((err)=>dispatch(setError(err.message)))
  }, [])
  useEffect(() => {
    setFiltered(state.doctors)
    filterLocations()
    setSpecialitiesFunc()
    setQualificationFunc()
  }, [state.doctors])
  function setPopup(bool){
   setBookingDisplay(bool)
  }
  return (
    <div className='doctors-page' >
      <BookingPopUp display={bookingDisplay} setPopup={setPopup}/>
      <div style={{filter:bookingDisplay?"opacity(30%)":"opacity(100%)"}} className="filter box">
        <div className="box search">
          <input ref={searchInput} type="text" />
          <button onClick={() => {
            filter()
          }} >Search</button>
        </div>
        <div className="box">
          <p>Location</p>
          <p className='border-p'>
          <input className='no-border-inp' ref={locationRef} onChange={(e) => filterLocations(e.target.value)} type="text" name="" id="" />
          <button onClick={() => {
            filterLocations()
            locationRef.current.value = ""
            filter("location", "")
          }
          } >X</button>
          {/* <button>S</button> */}
          </p>
          
        </div>
        <div className="dropdown">
          {locations.map(location => <button className='submit-btn' onClick={() => {
            console.log(locationRef)
            locationRef.current.value = location
            filter()
          }} >{location}</button>)}
        </div>
        <div className="box">
          <p>Speciality</p>
          {/* <input onChange={(e)=>setSpecialitiesFunc(e.target.value)} type="text" /> */}
          <Multiselect ref={specialitiesRef}
            options={specialities.map((speciality, i) => {
              return { name: speciality, id: i }
            })} // Options to display in the dropdown
            selectedValues={[]} // Preselected value to persist in dropdown
            // onSelect={onSelect} // Function will trigger on select event
            // onRemove={onRemove} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
            avoidHighlightFirstOption={true}
          />
        </div>
        <div className="box">
          <p>Qualifications</p>
          {/* <input onChange={(e)=>setSpecialitiesFunc(e.target.value)} type="text" /> */}
          <Multiselect ref={qualificationsRef}
            options={qualifications.map((qualification, i) => {
              return { name: qualification, id: i }
            })} // Options to display in the dropdown
            selectedValues={[]} // Preselected value to persist in dropdown
            // onSelect={onSelect} // Function will trigger on select event
            // onRemove={onRemove} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
            avoidHighlightFirstOption={true}
          />
        </div>
      </div>
      <div  style={{filter:bookingDisplay?"opacity(30%)":"opacity(100%)"}}  className="doctors">
        {filteredList.map((doctor, i) => {
          if(doctor.location){
          return <div onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} className={hovered===i?'doctor-card hovered':'doctor-card'}>
            <div  className="left">
              <h1>{doctor.name}</h1>
              <p>{doctor.specialities !== null ? doctor.specialities[0] : null}</p>
              <p>{doctor.location}</p>
              <p>{doctor.ratings?"Rating:"+doctor.ratings+"/5":"Not Rated Yet"}</p>
            </div>
            <div style={{ display: i === hovered ? "flex" : "none", width: i === hovered ? "50%" : "30%" }} className="right">
              <div className="box">
                <h3>Degree</h3>
                <div>
                  {doctor.qualifications.map((qualification,i) => <span>{qualification}{i<doctor.qualifications.length-1?",":null}</span>)}
                </div>
              </div>
              <div className="box">
                <h3>Speciality</h3>
                <div>
                  {doctor.specialities !== null ? doctor.specialities.map(speciality => <span>{speciality}{i<doctor.specialities.length-1?",":null}</span>) : null}
                </div>
              </div>
              <div className="box">
                <h3>Hospital</h3>
                <p>
                  {doctor.hospital}
                </p>
              </div>
              <div className="box">
                <h3>Cost</h3>
                <p>
                  {doctor.cost}
                </p>
              </div>
              <div className="row">
              <button className='nav-btn' onClick={()=>{
                setPopup(true)
                console.log(i)
                console.log(state.doctors)
                dispatch(setCurrentViewedDoctor(i))
                dispatch(getAllBookingsDoctor(state.currentDoctor.id)).catch((err)=>dispatch(setError(err.message)))
                }}>Book</button>
              <button className='nav-btn' onClick={()=>goTo(`/doctor/${i}`)}  >View Profile</button>
              </div>
            </div>
          </div>
          }
          else{
            return null
          }
        })}
      </div>
    </div>
  )
}
