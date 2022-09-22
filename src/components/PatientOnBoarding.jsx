import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
export default function PatientOnBoarding() {
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
  });
  return (
    <div className='onboarding'>
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
        //Some bug here, Will debug
        onSubmit={
          values => {
            console.log(values)
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
                <Field name="contactnumber" type="number" />
                <div>Contact Number</div>
                {errors.contactnumber && touched.contactnumber ? (
                  <div>{errors.contactnumber}</div>
                ) : null}
              </div>

            </div>
            <div className="box">
              <div>Past Diseases</div>
              {/* <Field name="email" type="email" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null} */}
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
              <div className="box">
                <Field name="age" type="number" />
                {errors.age && touched.age ? (
                  <div>{errors.age}</div>
                ) : null}
              </div>
              <div className="box">
                <div>Gender</div>
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
