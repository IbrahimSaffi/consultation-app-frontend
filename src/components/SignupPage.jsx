import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom"

export default function SignupPage() {
  let goTo = useNavigate()
    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
          .min(3, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        lastName: Yup.string()
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
    <div className='signup'> 
    <Formik
    initialValues={{
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }}
    validationSchema={SignupSchema}
    //Some bug here, Will debug
    onSubmit={
      values => {
        // console.log("here")
        // console.log(values)
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
        <div>First Name</div>
        <Field name="firstName" />
        {errors.firstName && touched.firstName ? (
          <div>{errors.firstName}</div>
        ) : null}
        <div>Last Name</div>
        <Field name="lastName" />
        {errors.lastName && touched.lastName ? (
          <div>{errors.lastName}</div>
        ) : null}
        <div>Enter Email</div>
        <Field name="email" type="email" />
        {errors.email && touched.email ? <div>{errors.email}</div> : null}
        <div>Enter Password</div>
        <Field name="password" type="password" />
        {errors.password && touched.password ? (
          <div>{errors.password}</div>
        ) : null}
        <div>Confirm Password</div>
        <Field name="confirmPassword" type="password" />
        {errors.confirmPassword && touched.confirmPassword ? (
          <div>{errors.confirmPassword}</div>
        ) : null}
        <button type='submit' onClick={() => console.log("clicked")}>Create Account</button>
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
  )
}
