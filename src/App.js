import React ,{ Fragment } from 'react';
import {  Route, Switch, Redirect, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
// import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';
import CountryDetails from './components/CountryDetails/CountryDetails';
import AddActivities from './components/AddActivities/AddActivities';
import Login from './components/auth/Login';
import LandingPage from './components/LandingPage/LandingPage';
import ErrorNotFound from './Error/ErrorNotFound';
import CountriesByName from './components/CountriesByName/CountriesByName';
import Activities from './components/Activities/Activities';


function App() {
  return (
    <Fragment>
    {/* <NavBar />   */}
    <div className="App">
      
      <Routes>
        {/* <Route element={<NavBar />} /> */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={
          <>
          <NavBar />
          <HomePage />
          </>
        }/>
        <Route path='/home/country/:id' element={
          <>
          <NavBar />
          <CountryDetails />
          </>
        }/>
        <Route path='/home/countries/name/:name' element={
          <>
          <NavBar />
          <CountriesByName />
          </>
        }/>
        <Route path='/home/add' element={
          <>
          <NavBar />
          <AddActivities />
          </>
        }/>
        <Route path='/home/login' element={
          <>
          <NavBar />
          <Login />
          </>
        }/>
        <Route path='/404-notFound' element={
          <>
          <NavBar />
          <ErrorNotFound />
          </>
        }/>
        <Route path='/home/activities' element={
          <>
          <NavBar />
          <Activities />
          </>
        }/>
        {/* <Redirect to='/home' /> */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>

    </div>
    </Fragment>
  );
}

export default App;
