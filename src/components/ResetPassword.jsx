import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import mainSlice, { sendResetCode, setError } from '../slices/mainSlice';
import { useRef } from 'react';
export default function ResetPassword() {
 let [displayFields,setDisplayFields] = useState(false)
  let dispatch = useDispatch(mainSlice)
  let emailRef = useRef()
  const ResetSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    resetCode: Yup.number(),
    password: Yup.string().min(6, "Password should be atleast 6 letter long").required('Password is required'),
    confirmPassword: Yup.string().test("password-match", "Passwords must match", function (value) {
      return this.parent.password === value
    }).required('Re-enter Password'),
  });
  return (
    <div className='reset-page' >
      <div className="reset-container">
      <Formik
    initialValues={{
      email: '',
      resetCode:"",
      password: '',
      confirmPassword: '',
    }}
    validationSchema={ResetSchema}
    //Some bug here, Will debug
    onSubmit={
      values => {
          console.log(values)
          }
        }
        >
    {({ errors, touched }) => (
      <Form className='form' >
        <div className="box" style={{display:!displayFields?"flex":"none"}} >
        <div>Enter Email</div>
        <Field innerRef={emailRef} name="email" type="email" />
        {errors.email && touched.email ? <div className='inp-err' >{errors.email}</div> : null}
        <button type='button' onClick={()=>dispatch(sendResetCode({email:emailRef.current.value})).then(()=>setDisplayFields(true)).catch((err)=>dispatch(setError(err.message)))} className='submit-btn' >Get Reset Link</button>
        </div>
        <div className="box " style={{display:displayFields?"flex":"none"}}>
        <div className="box">
        <div>Enter Reset Code</div>
        <Field name="resetCode" type="number" />
        {errors.number && touched.number ? <div className='inp-err' >{errors.number}</div> : null}
        </div>
        <div className="box">
        <p>Enter Password</p>
        <Field name="password" type="password" />
        {errors.password && touched.password ? (
          <div className='inp-err' >{errors.password}</div>
          ) : null}
          </div>
        <div className="box">
        <div>Confirm Password</div>
        <Field name="confirmPassword" type="password" />
        {errors.confirmPassword && touched.confirmPassword ? (
          <div className='inp-err' >{errors.confirmPassword}</div>
          ) : null}
        </div>
        <button className='submit-btn' type='submit' onClick={() => console.log("clicked")}>Reset Password</button>
    </div>
      </Form>
    )}
  </Formik>
      </div>
      <img src="./sideimg.jfif" alt="" />
      </div>
      )
}
