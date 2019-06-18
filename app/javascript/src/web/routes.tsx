import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Courses from './pages/Courses'
import PageNotFound from './pages/PageNotFound'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'

const Routes = () => (
  <Switch>
    <PrivateRoute path="/dashboard" component={Dashboard} condition />
    <PrivateRoute path="/courses" component={Courses} condition />
    <Redirect exact from="/" to="/dashboard" />
    <Route component={PageNotFound} />
  </Switch>
)

export default Routes
