import { COURSE_RECORDINGS_FETCH_SUCCESS } from './CourseRecordings.types'
import courseRecordingsReducer, {
  CourseRecordingsState,
} from './CourseRecordings.reducer'
import { CourseRecordingsActionTypes } from './CourseRecordings.actions'
import courseRecordingsMiddleware from './CourseRecordings.middlewares'

export { default } from './CourseRecordings'

// Typescript types
export type CourseRecordingsActionTypes = CourseRecordingsActionTypes
export type CourseRecordingsState = CourseRecordingsState

// Action types
export { COURSE_RECORDINGS_FETCH_SUCCESS }

// Reducers
export { courseRecordingsReducer }

// Middlewares
export { courseRecordingsMiddleware }
