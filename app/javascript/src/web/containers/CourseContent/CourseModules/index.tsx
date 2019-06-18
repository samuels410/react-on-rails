import courseModulesReducer, {
  CourseModulesState,
} from './CourseModules.reducer'
import courseModulesMiddleware from './CourseModules.middlewares'
import {
  fetchCourseModules,
  fetchCourseModulesCancel,
  CourseModulesFetchParams,
} from './CourseModules.actions'
import { COURSE_MODULES_FETCH_SUCCESS } from './CourseModules.types'

// Typescript Types
export type CourseModulesState = CourseModulesState
export type CourseModulesFetchParams = CourseModulesFetchParams

export { courseModulesMiddleware, courseModulesReducer }

// Redux Actions
export { fetchCourseModules, fetchCourseModulesCancel }

// Action Types
export { COURSE_MODULES_FETCH_SUCCESS }
