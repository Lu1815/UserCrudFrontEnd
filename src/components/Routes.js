import React from 'react'
import { Routes as Switch, Route } from 'react-router-dom';
import ProtectedRoutes from '../utils/ProtectedRoutes';
import Dashboard from './Dashboard';
import Login from './Login';
import Signup from './Signup';

const Routes = ({ handleNotification }) => {
  return (
    <div>
        <Switch>
            <Route exact path='/' element={<Login handleNotification={handleNotification} />}/>
            <Route exact path='/signup' element={<Signup/>}/>
            <Route element={<ProtectedRoutes />} >
              <Route exact path='/dashboard' element={<Dashboard/>}/>
            </Route>
        </Switch>
    </div>
  )
}

export default Routes

