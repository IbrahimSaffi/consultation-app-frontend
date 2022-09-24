import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import mainSlice, { createUser } from '../slices/mainSlice';

export default function SignupPage() {
  let goTo = useNavigate()
  let dispatch = useDispatch(mainSlice)
  const [type,setType] = useState("Doctor")
    const SignupSchema = Yup.object().shape({
        name: Yup.string()
          .min(3, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, "Password should be atleast 6 letter long").required('Password is required'),
        confirmPassword: Yup.string().test("password-match", "Passwords must match", function (value) {
          return this.parent.password === value
        }).required('Re-enter Password'),
      });
  return (
    <div className="signuppage">
    <div className='signup'> 
    <h1>Join Doc Seek</h1>
    <p>Your end to end Medical Care Partner</p>
    <Formik
    initialValues={{
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }}
    validationSchema={SignupSchema}
    //Some bug here, Will debug
    onSubmit={
      values => {
        values.type = type
        dispatch(createUser(values)).then(()=>goTo("/login")).catch(err=>console.log(err))
        // try{
          //   let name = values.firstName+" "+values.lastName
          //   values.name = name
          //     dispatch(createUser(values)).then(()=>goTo("/login")).catch(err=>dispatch(setError(err.message)))
          // }
          // catch(err){
            //    console.log(err)
            // }
          }
        }
        >
    {({ errors, touched }) => (
      <Form className='form' >
        <div className="box">
        <div>Name</div>
        <Field name="name" />
        {errors.name && touched.name ? (
          <div>{errors.name}</div>
          ) : null}
        </div>
        <div className="box">
        <div>Enter Email</div>
        <Field name="email" type="email" />
        {errors.email && touched.email ? <div>{errors.email}</div> : null}
        <div>Enter Password</div>
        </div>
        <div className="box">
        <Field name="password" type="password" />
        {errors.password && touched.password ? (
          <div>{errors.password}</div>
          ) : null}
        </div>
        <div className="box">
        <div>Confirm Password</div>
        <Field name="confirmPassword" type="password" />
        {errors.confirmPassword && touched.confirmPassword ? (
          <div>{errors.confirmPassword}</div>
          ) : null}
        </div>
        <button type='button' style={{backgroundColor:type==="Doctor"?"wheat":"white"}} onClick={()=>setType("Doctor")}>Doctor</button>
        <button type='button' style={{backgroundColor:type==="Patient"?"wheat":"white"}} onClick={()=>setType("Patient")}>Patient</button>
        <button type='submit' onClick={() => console.log("clicked")}>Sign Up</button>
      </Form>
    )}
  </Formik>
  <div className='row' >
    <p>
      Already a user?
    </p>
      <button onClick={() => goTo("/login")} >Login</button>
  </div>
  </div>
  <img src="./sideimg.jfif" alt="" />
    </div>
  )
}
