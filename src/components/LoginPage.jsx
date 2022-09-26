import React, { useRef, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom"
import mainSlice, { login, setError } from '../slices/mainSlice';
import { useDispatch } from 'react-redux';
import Logo from './Logo';

export default function LoginPage() {
    let goTo = useNavigate()
    let dispatch = useDispatch(mainSlice)
    let [selected, setSelected] = useState("Doctor")
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, "Password should be atleast 6 letter long").required('Password is required'),
    });
    return (
        <div className="loginpage">
            <div className='login' >
            <Logo/>
                <h1 className='auth-heading' >Sign in to your account</h1>
                {selected === "Doctor" ? <p className='auth-label'>Sign in to Help Patients</p> : <p className='auth-label'>Sign in to Find Best Doctor</p>}
                <div className="centered-row">
                    <p>Doctor</p>
                    <input onClick={() => {
                        setSelected("Doctor")
                    }} type="radio" value="Doctor" name='type' checked={selected === "Doctor"} />
                    <p>Patient</p>
                    <input onClick={() => {
                        setSelected("Patient")
                    }} type="radio" value="Patient" name='type' />

                </div>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={
                        values => {
                            values.type = selected
                            dispatch(login(values)).then(() => goTo("/onboarding"))
                            .catch((err)=>{
                                console.log(err)
                                dispatch(setError(err.message))
                            })
                        }
                    }
                >
                    {({ errors, touched }) => (
                        <Form className='form' >
                            <div>Enter Email</div>
                            <Field name="email" type="email" />
                            {errors.email && touched.email ? <div className='inp-err'>{errors.email}</div> : null}
                            <div>Enter Password</div>
                            <Field name="password" type="password" />
                            {errors.password && touched.password ? (
                                <div className='inp-err'>{errors.password}</div>
                            ) : null}
                            <button className='submit-btn' type='submit' >Login</button>
                        </Form>
                    )}
                </Formik>
                <div className="row">
                    <p >Forgot Password?</p> <button className='nav-btn' onClick={() => goTo("/reset")} >Reset Password</button>
                </div>
                <div className="row">
                    <p >No Account?</p>  <button className='nav-btn' onClick={() => goTo("/signup")} >Create Account</button>
                </div>
            </div>
            <img src="./sideimg.jfif" alt="" />
        </div>
    )
}
