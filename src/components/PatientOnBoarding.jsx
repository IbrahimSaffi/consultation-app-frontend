import React, { createRef, useEffect, useRef, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Multiselect from 'multiselect-react-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import mainSlice, { setError, updatePatient } from '../slices/mainSlice';
import { Routes,Route,useNavigate} from 'react-router-dom';

export default function PatientOnBoarding() {
  let goTo = useNavigate()
  useEffect(()=>{
   if(state.profile.gender){
      goTo("/")
   }
   else{
     goTo("/onBoarding")
   }
  },[])
  const [diseasesRef, setDiseasesRef] = useState([])
  const [diseasesFields, setDiseasesFields] = useState([0])
  const [yearsRef, setYearsRef] = useState([])
  let dispatch = useDispatch(mainSlice)
  let state = useSelector(state=>state.mainSlice)
 let genderRef = useRef()
  useEffect(() => {
    let tempRefs = diseasesFields.map((option, i) => createRef())
    console.log(tempRefs)
    setDiseasesRef(tempRefs)
    setYearsRef(tempRefs)
  }, [diseasesFields])
  function addDiseasesField() {
    let currDiseasesFields = diseasesFields.slice()
    currDiseasesFields.push(0)
    setDiseasesFields(currDiseasesFields)
  }
  function onSelect() {

  }
  function onRemove() {

  }
  const PatientOnBoardingScheme = Yup.object().shape({
    city: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    country: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    bloodgroup: Yup.string().required('Required'),
    weight: Yup.string().required('Required'),
    age:Yup.number().required('Required'),
    contactnumber:Yup.string().required('Required')
  });
  return (
    <div style={{ backgroundImage: "url(./bg.jfif)" }} className='onboarding'>
      <h1>Tell us about your self</h1>
      <Formik
        initialValues={{
          city: '',
          country: '',
          contactnumber: "",
          bloodgroup: '',
          weight: '',
          age: "",
        }}
        validationSchema={PatientOnBoardingScheme}
        onSubmit={
          values => {
            values.pastDiseases = JSON.stringify(diseasesRef.map((diseaseRef, i) => {
              return {
                disease: diseaseRef.current.value,
                years: yearsRef[i].current.value
              }
            }))
           values.gender= genderRef.current.getSelectedItems()[0].name
           dispatch(updatePatient({dataValues:values,id:state.profile.id})).then(()=>console.log("success")).catch((err)=>dispatch(setError(err.message)))
          }
        }
      >
        {({ errors, touched }) => (
          <Form className='form' >
            <div className="row">
              <div className="box">
                <div>City</div>
                <Field name="city" />
                {errors.city && touched.city ? (
                  <div className='inp-err'>{errors.city}</div>
                ) : null}
              </div>
              <div className="box">
                <div>Country</div>
                <Field name="country" />
                {errors.country && touched.country ? (
                  <div className='inp-err'>{errors.country}</div>
                ) : null}
              </div>
              <div className="box">
                <div>Contact Number</div>
                <Field name="contactnumber" />
                {errors.contactnumber && touched.contactnumber ? (
                  <div className='inp-err'>{errors.contactnumber}</div>
                ) : null}
              </div>

            </div>
            <div className="box">
              <div>Past Health Issues</div>
              {diseasesFields.map((diseasesField, i) => <div className="centered-row">
                <input placeholder='Disease Name' style={{width:"100%"}} ref={diseasesRef[i]} type="text" />
                <input placeholder='Years since this disease' style={{width:"100%"}} ref={yearsRef[i]} type="text" />
              </div>)}
              <button className='submit-btn self-center' onClick={() => addDiseasesField()} type='button' >Add More</button>
            </div>
            <div className="row">
              <div className="box">
                <div>Blood Group</div>
                <Field name="bloodgroup" />
                {errors.bloodgroup && touched.bloodgroup ? (
                  <div className='inp-err'>{errors.bloodgroup}</div>
                ) : null}
              </div>
              <div className="box">
                <div>Weight</div>
                <Field name="weight" type="number" />
                {errors.weight && touched.weight ? (
                  <div className='inp-err'>{errors.weight}</div>
                ) : null}
              </div>
              <div className="box">
              <div>Age</div>
                <Field name="age" type="number" />
                {errors.age && touched.age ? (
                  <div className='inp-err'>{errors.age}</div>
                ) : null}
              </div>
              <div className="box">
                <div>Gender</div>
                <Multiselect ref={genderRef}
                  options={[{ name: 'Male', id: 1 }, { name: 'Female', id: 2 }, { name: 'Other', id: 3 }]} // Options to display in the dropdown
                  selectedValues={{ name: 'Male', id: 1 }} // Preselected value to persist in dropdown
                  onSelect={onSelect} // Function will trigger on select event
                  onRemove={onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                  singleSelect={true}
                />
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
