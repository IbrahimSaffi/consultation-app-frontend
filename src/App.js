import './app.css';
import Header from './components/Header';
import { Routes,Route} from 'react-router-dom';
import DoctorsProfile from './components/DoctorsProfile';
import PatientsProfile from './components/PatientsProfile';
import Doctors from './components/Doctors';
import OnBoarding from './components/PatientOnBoarding';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ViewPatient from './components/ViewPatient';
import ViewDoctor from './components/ViewDoctor';
import PatientOnBoarding from './components/PatientOnBoarding';
import DoctorOnBoarding from './components/DoctorOnBoarding';

function App() {
  return (
    <div className="app">
    <Header/>
    <Routes>
      <Route path='/profile' element={
        state.profile.type==="doctor"?<DoctorsProfile/>:<PatientsProfile/>
        }/>
      <Route path='/' element={<Doctors/>}/>
      <Route path='/onboarding' element={
        state.profile.type==="doctor"?<PatientOnBoarding/>:<DoctorOnBoarding/>
        }/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/patient/:id' element={<ViewPatient/>}/>
      {/* Booking will happen in following page */}
      <Route path='/doctor/:id' element={<ViewDoctor/>}/>
    </Routes>
    </div>
  );
}

export default App;
