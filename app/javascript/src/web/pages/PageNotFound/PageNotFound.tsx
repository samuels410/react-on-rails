import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import PageNotFoundContent from '../../components/PageNotFoundContent'

const PageNotFound = () => (
  <Fragment>
    <NavLink to="/courses"> Go to courses </NavLink>
    <PageNotFoundContent />
  </Fragment>
)

export default PageNotFound
