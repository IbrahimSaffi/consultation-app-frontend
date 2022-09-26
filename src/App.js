import './App.css';
import Header from './components/Header';
import { Routes,Route,useNavigate} from 'react-router-dom';
import DoctorsProfile from './components/DoctorsProfile';
import PatientsProfile from './components/PatientsProfile';
import Doctors from './components/Doctors';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
// import ViewPatient from './components/ViewPatient';
import ViewDoctor from './components/ViewDoctor';
import PatientOnBoarding from './components/PatientOnBoarding';
import DoctorOnBoarding from './components/DoctorOnBoarding';
import { useDispatch, useSelector } from 'react-redux';
import ResetPassword from './components/ResetPassword';
import { useEffect, useState } from 'react';
import mainSlice, { setError } from './slices/mainSlice';

function App() {
    let state = useSelector(state=>state.mainSlice)
    let dispatch = useDispatch(mainSlice)
    let goTo = useNavigate()
    let [errPos,setPos] = useState("-40px") 
 useEffect(()=>{
  console.log(state.error)
     setPos("40px")
     setTimeout(()=>{
       setPos("-40px")
      setTimeout(()=>{
        dispatch(setError(""))
       },6000)
    },3000)
 },[state.error])
    useEffect(()=>{
       if(!state.profile){
        goTo("/login")
       }
       else if(state.profile){
        if(state.profile.type.toLowerCase()==="doctor"){
          if(!state.profile.location){
            console.log("here")
            goTo("/onboarding")
          }
          else{
            goTo("/")
          }
        }
        else{
          if(!state.profile.gender){
            goTo("/onboarding")
          }
          else{
            
              goTo("/")
          }
        }
       }
    },[state.profile])
  return (
    <div className="app">
    <Header/>
    <p className='error' style={{top:errPos}} >{state.error}</p>
    <Routes>
    {/* <Route path='/onboarding' element={<DoctorOnBoarding/>}/> */}
    {/* <Route path='/onboarding' element={<PatientOnBoarding/>}/> */}
      {state.profile?
      <Route path='/profile' element={
        state.profile.type.toLowerCase()==="doctor"?<DoctorsProfile/>:<PatientsProfile/>
        }/>:null}
      <Route path='/' element={<Doctors/>}/>
      {state.profile?
        <Route path='/onboarding' element={
          state.profile.type.toLowerCase()==="doctor"?<DoctorOnBoarding/>:<PatientOnBoarding/>
          }/>:null
      }
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      {/* <Route path='/patient/:id' element={<ViewPatient/>}/> */}
      {/* Booking will happen in following page */}
      <Route path='/doctor/:id' element={<ViewDoctor/>}/>
      <Route path='/reset' element={<ResetPassword/>}/>
      
    </Routes>
    </div>
  );
}

export default App;
