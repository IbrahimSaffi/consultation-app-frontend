import React, { createRef, useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Multiselect from 'multiselect-react-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import mainSlice, { getDoctors, setError, updateInformationDoctor } from '../slices/mainSlice';
import { useNavigate} from 'react-router-dom';

export default function DoctorOnBoarding() {
  let goTo = useNavigate()
  useEffect(()=>{
   if(state.profile.location){
      goTo("/profile")
   }
  },[])
  const [qualificationsRef, setQualifictionsRef] = useState([])
  const [specialitiesRef, setSpecialitiesRef] = useState([])
  const [slotsRefFrom, setSlotsFromRef] = useState([])
  const [slotsRefTo, setSlotsToRef] = useState([])
  const [slotsDaysRef, setSlotsDaysRef] = useState([])
  const [qualificationsFields, setQualifictionsFields] = useState([0])
  const [specialitiesFields, setSpecialitiesFields] = useState([0])
  const [slotsFields, setSlotsFields] = useState([0])
 let dispatch = useDispatch(mainSlice)
 let state = useSelector(state=>state.mainSlice)
  useEffect(() => {
    let tempRefs = specialitiesFields.map((option, i) => createRef())
    setSpecialitiesRef(tempRefs)
  }, [specialitiesFields])
  useEffect(() => {
    let tempRefs = qualificationsFields.map((option, i) => createRef())
    setQualifictionsRef(tempRefs)
  }, [qualificationsFields])
  useEffect(() => {
    setSlotsDaysRef(slotsFields.map((option, i) => createRef()))
    setSlotsToRef(slotsFields.map((option, i) => createRef()))
    setSlotsFromRef(slotsFields.map((option, i) => createRef()))

  }, [slotsFields])
  function addQualificationField() {
    let currQualificationFields = qualificationsFields.slice()
    currQualificationFields.push(0)
    setQualifictionsFields(currQualificationFields)
  }
  function addSpecialityField() {
    let currSpecialityFields = specialitiesFields.slice()
    currSpecialityFields.push(0)
    setSpecialitiesFields(currSpecialityFields)
  }
  function addSlotsField() {
    let currSlotFields = slotsFields.slice()
    console.log(currSlotFields)
    currSlotFields.push(0)
    setSlotsFields(currSlotFields)
  }
  function onSelect(selectedList, selectedItem) {
    if (selectedItem.name === "All Week Days") {
      let index = selectedList.findIndex(selected => selected.name === "All Week Days")
      selectedList.splice(index, 1)
      let days = [{ name: 'Monday', id: 1 }, { name: 'Tuesday', id: 2 }, { name: 'Wednesday', id: 3 }, { name: 'Thursday', id: 4 }, { name: 'Friday', id: 5 }]
      days.forEach(day => {
        let included = false
        selectedList.forEach(selection => {
          if (selection.name === day.name) {
            included = true
          }
        })
        if (!included) {
          selectedList.push(day)
        }
      })
    }
    else {
      selectedList = []
      selectedList.push(selectedItem)
    }

  }

  function onRemove(selectedList, removedItem) {

  }

  const DoctorOnBoardingScheme = Yup.object().shape({
    hospital: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    location: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    cost: Yup.number().required('Required'),
    experience: Yup.number().required('Required'),
  });
  return (
    <div style={{ backgroundImage: "url(./bg.jfif)" }}  className='onboarding'>
      <Formik
        initialValues={{
          hospital: '',
          location: '',
          cost: '',
          experience: '',
        }}
        validationSchema={DoctorOnBoardingScheme}
        onSubmit={
          values => {
            values.qualifications = qualificationsRef.map(qualificationRef => qualificationRef.current.value)
            values.specialities = specialitiesRef.map(specialityRef => specialityRef.current.value)
            let slotsObj = {}
            slotsDaysRef.forEach((slotDaysRef,refNo) => {
              let days = slotDaysRef.current.getSelectedItems()
              days.forEach((day) => {
                if (!slotsObj.hasOwnProperty(day.name)) {
                  slotsObj[day.name] = []
                }
                slotsObj[day.name].push([slotsRefFrom[refNo].current.value, slotsRefTo[refNo].current.value])
              })
            })
            values.availableSlots = JSON.stringify(slotsObj)
           dispatch(updateInformationDoctor({id:state.profile.id ,dataValues:values})).then(()=>console.log("success")).catch((err)=>dispatch(setError(err.message)))
          }
        }
      >
        {({ errors, touched }) => (
          <Form className='form' >
            <div className="row">
              <div className="box">
                <div>Hospital</div>
                <Field name="hospital" />
                {errors.hospital && touched.hospital ? (
                  <div className='inp-err'>{errors.hospital}</div>
                ) : null}
              </div>
              <div className="box">
                <div>Location</div>
                <Field name="location" />
                {errors.location && touched.location ? (
                  <div className='inp-err'>{errors.location}</div>
                ) : null}
              </div>
              <div className="box">
                <div>Cost</div>
                <Field name="cost" />
                {errors.cost && touched.cost ? (
                  <div className='inp-err'>{errors.cost}</div>
                ) : null}
              </div>
            </div>
            <div className="box">
              <div>Qualifications</div>
              {qualificationsFields.map((qualificationsField, i) => <input ref={qualificationsRef[i]} type="text" />)}
              <button className='submit-btn self-center' type='button' onClick={() => addQualificationField()} >Add More</button>
            </div>
            <div className="box">
              <div>Specializations</div>
              {specialitiesFields.map((specialitiesField, i) => <input ref={specialitiesRef[i]} type="text" />)}
              <button className='submit-btn self-center' type='button' onClick={() => addSpecialityField()} >Add More</button>
            </div>
            <div className="row">
              <div className="box">
                <div>Experience</div>
                <Field name="experience" />
                {errors.experience && touched.experience ? (
                  <div className='inp-err'>{errors.experience}</div>
                ) : null}
              </div>
                <div>Available Times</div>
              <div className="box slots-onboarding">
                {slotsFields.map((slotField, i) => <div className="row">
                  <div className="box">
                    <div>From</div>
                    <input ref={slotsRefTo[i]} type="time" />
                  </div>
                  <div className="box">
                    <div>To</div>
                    <input ref={slotsRefFrom[i]} type="time" />
                  </div>
                  <div>Day</div>
                  <Multiselect ref={slotsDaysRef[i]}
                    options={[{ name: 'All Week Days', id: 0 }, { name: 'Monday', id: 1 }, { name: 'Tuesday', id: 2 }, { name: 'Wednesday', id: 3 }, { name: 'Thursday', id: 4 }, { name: 'Friday', id: 5 }]} // Options to display in the dropdown
                    selectedValues={[{ name: 'Monday', id: 1 }, { name: 'Tuesday', id: 2 }, { name: 'Wednesday', id: 3 }, { name: 'Thursday', id: 4 }, { name: 'Friday', id: 5 }]} // Preselected value to persist in dropdown
                    onSelect={onSelect} // Function will trigger on select event
                    onRemove={onRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </div>)}
                <button className='submit-btn self-center' type='button' onClick={() => addSlotsField()} >Add More</button>
              </div>
            </div>
            <div className="row">
              <button className='submit-btn self-center' type='submit' onClick={() => console.log("clicked")}>Save</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
