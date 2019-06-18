import courseListReducer, { CourseListState } from './Courses.reducer'
import coursesMiddleware from './Courses.middlewares'
import {
  fetchCourseList,
  fetchCourseListCancel,
  fetchCourseDetails,
} from './Courses.actions'

export type CourseListState = CourseListState

export { courseListReducer, coursesMiddleware }

export { fetchCourseList, fetchCourseListCancel, fetchCourseDetails }
export { default } from './Courses'
