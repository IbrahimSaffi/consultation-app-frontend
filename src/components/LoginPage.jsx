import React, { useRef, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom"
import mainSlice, { login } from '../slices/mainSlice';
import { useDispatch } from 'react-redux';

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
                <h1>Sign in to your account</h1>
                {selected === "Doctor" ? <p>Sign in to Help Patients</p> : <p>Sign in to Find Best Doctor</p>}
                <div className="row">
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
                            dispatch(login(values)).then(() => goTo("/onboarding"))
                                .catch(err => console.log(err))
                        }
                    }
                >
                    {({ errors, touched }) => (
                        <Form className='form' >
                            <div>Enter Email</div>
                            <Field name="email" type="email" />
                            {errors.email && touched.email ? <div>{errors.email}</div> : null}
                            <div>Enter Password</div>
                            <Field name="password" type="password" />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                            <button type='submit' >Login</button>
                        </Form>
                    )}
                </Formik>
                <div className="row">
                    <p>Forgot Password?</p> <button onClick={() => goTo("/reset")} >Reset Password</button>
                </div>
                <div className="row">
                    <p>No Account?</p>  <button onClick={() => goTo("/signup")} >Create Account</button>
                </div>
            </div>
            <img src="./sideimg.jfif" alt="" />
        </div>
    )
}
