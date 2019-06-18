import React from 'react'
import { RouteComponentProps, Route, Switch } from 'react-router-dom'
import CourseList from '../CourseList'
import CourseContentItem from '../CourseContentItem'
import CourseDetails from '../CourseDetails'

interface CoursesProps extends RouteComponentProps {}

const Courses = ({ match }: CoursesProps) => (
  <Switch>
    <Route exact path={match.path} component={CourseList} />
    <Route
      exact
      path={`${match.path}/:courseId/modules/:moduleId/items/:itemId`}
      component={CourseContentItem}
    />
    <Route path={`${match.path}/:courseId`} component={CourseDetails} />
  </Switch>
)

export default Courses
