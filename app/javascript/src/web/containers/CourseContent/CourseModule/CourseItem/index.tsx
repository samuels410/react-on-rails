import courseItemContentMiddleware from './CourseItem.middlewares'
import {
  COURSE_ITEM_CONTENT_FETCH_SUCCESS,
  COURSE_ITEM_CONTENT_FETCH_FAILURE,
} from './CourseItem.types'
import {
  CourseItemContentActionTypes,
  fetchCourseItemContent,
} from './CourseItem.actions'
import courseItemContentReducer from './CourseItem.reducer'

export { default } from './CourseItem'

// TypeScript types
export type CourseItemContentActionTypes = CourseItemContentActionTypes

// actions
export { fetchCourseItemContent }

// Action Types
export { COURSE_ITEM_CONTENT_FETCH_FAILURE, COURSE_ITEM_CONTENT_FETCH_SUCCESS }

// Middlewares
export { courseItemContentMiddleware }

// Reducers
export { courseItemContentReducer }
