import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import Login from '../src/components/Auth/Login.jsx'
import Signup from '../src/components/Auth/Signup.jsx'
import HomePage from './components/Home/HomePage.jsx';
import DetailDoctor from './components/Home/DetailDoctor.jsx';
import AllDoctors from './components/Home/AllDoctors.jsx';
import ManageUsers from './components/admin/ManageUsers.jsx';
import ManageDoctors from './components/admin/ManageDoctors.jsx';
import ManageSpecialties from './components/admin/ManageSpecialties.jsx';
import ManageClinics from './components/admin/ManageClinics.jsx';

const App = () => {
  return (
    <div className='app-container'>
      <Router>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/all-doctors'>
            <AllDoctors />
          </Route>
          <Route path='/manage-list-users'>
            <ManageUsers />
          </Route>
          <Route path='/manage-list-doctors'>
            <ManageDoctors />
          </Route>
          <Route path='/manage-list-specialties'>
            <ManageSpecialties />
          </Route>
          <Route path='/manage-list-clinics'>
            <ManageClinics />
          </Route>
          <Route path='/detail-doctor/:id'>
            <DetailDoctor />
          </Route>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='*'>
            404 Not found
          </Route>
        </Switch>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </div>
  )
}

export default App
