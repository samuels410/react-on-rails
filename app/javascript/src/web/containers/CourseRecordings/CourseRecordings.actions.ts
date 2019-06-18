import {
  COURSE_RECORDINGS_FETCH,
  COURSE_RECORDINGS_FETCH_CANCEL,
  COURSE_RECORDINGS_FETCH_FAILURE,
  COURSE_RECORDINGS_FETCH_SUCCESS,
} from './CourseRecordings.types'
import { CourseID } from '../../../common/types'

interface CourseRecordingsFetchParams {
  courseId: CourseID
}

interface CourseRecordingsMetaParams {
  courseId: CourseID
}

export const fetchCourseRecordings = (
  payload: CourseRecordingsFetchParams,
  meta: CourseRecordingsMetaParams
) => ({
  type: COURSE_RECORDINGS_FETCH as typeof COURSE_RECORDINGS_FETCH,
  payload,
  meta,
})

export const fetchCourseRecordingsSuccess = (
  payload: any,
  meta: CourseRecordingsMetaParams
) => ({
  type: COURSE_RECORDINGS_FETCH_SUCCESS as typeof COURSE_RECORDINGS_FETCH_SUCCESS,
  payload,
  meta,
})

export const fetchCourseRecordingsFailure = (
  payload: Error,
  meta: CourseRecordingsMetaParams
) => ({
  type: COURSE_RECORDINGS_FETCH_FAILURE as typeof COURSE_RECORDINGS_FETCH_FAILURE,
  payload,
  meta,
})

export const fetchCourseRecordingsCancel = (
  payload: CourseRecordingsFetchParams,
  meta: CourseRecordingsMetaParams
) => ({
  type: COURSE_RECORDINGS_FETCH_CANCEL as typeof COURSE_RECORDINGS_FETCH_CANCEL,
  payload,
  meta,
})

export type CourseRecordingsActionTypes =
  | ReturnType<typeof fetchCourseRecordings>
  | ReturnType<typeof fetchCourseRecordingsSuccess>
  | ReturnType<typeof fetchCourseRecordingsFailure>
  | ReturnType<typeof fetchCourseRecordingsCancel>
