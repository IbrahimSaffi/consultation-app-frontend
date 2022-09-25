import React, { createRef, useEffect, useRef, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Multiselect from 'multiselect-react-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import mainSlice, { updatePatient } from '../slices/mainSlice';
export default function PatientOnBoarding() {
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
           dispatch(updatePatient({dataValues:values,id:state.profile.id})).then(()=>console.log("success")).catch(err=>console.log(err))
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
                  <div>{errors.city}</div>
                ) : null}
              </div>
              <div className="box">
                <div>Country</div>
                <Field name="country" />
                {errors.country && touched.country ? (
                  <div>{errors.country}</div>
                ) : null}
              </div>
              <div className="box">
                <div>Contact Number</div>
                <Field name="contactnumber" />
                {errors.contactnumber && touched.contactnumber ? (
                  <div>{errors.contactnumber}</div>
                ) : null}
              </div>

            </div>
            <div className="box">
              <div>Past Health Issues</div>
              {diseasesFields.map((diseasesField, i) => <div className="row">
                <input ref={diseasesRef[i]} type="text" />
                <input ref={yearsRef[i]} type="text" />
              </div>)}
              <button onClick={() => addDiseasesField()} type='button' >Add More</button>
            </div>
            <div className="row">
              <div className="box">
                <div>Blood Group</div>
                <Field name="bloodgroup" />
                {errors.bloodgroup && touched.bloodgroup ? (
                  <div>{errors.bloodgroup}</div>
                ) : null}
              </div>
              <div className="box">
                <div>Weight</div>
                <Field name="weight" type="number" />
                {errors.weight && touched.weight ? (
                  <div>{errors.weight}</div>
                ) : null}
              </div>
              <div>Age</div>
              <div className="box">
                <Field name="age" type="number" />
                {errors.age && touched.age ? (
                  <div>{errors.age}</div>
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
              <button type='submit' onClick={() => console.log("clicked")}>Save</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
