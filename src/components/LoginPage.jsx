import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
    let goTo = useNavigate()
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, "Password should be atleast 6 letter long").required('Password is required'),
    });
    return (
        <div className='login' >
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={
                    values => {
                        console.log(values)
                        // dispatch(loginUser(values)).then(() => goTo("/teacher/templates"))
                        //     .catch(err => dispatch(setError(err.message)))
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
            <p>Forgot Password? <button onClick={()=>goTo("/reset")} >Reset Password</button></p>
            <p>No Account? <button onClick={() => goTo("/signup")} >Create Account</button></p>

        </div>
    )
}
