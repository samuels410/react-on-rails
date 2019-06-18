import {
  COURSE_GRADES_FETCH,
  COURSE_GRADES_FETCH_CANCEL,
  COURSE_GRADES_FETCH_FAILURE,
  COURSE_GRADES_FETCH_SUCCESS,
} from './CourseGrades.types'
import { CourseID } from '../../../common/types'

interface CourseGradesFetchParams {
  courseId: CourseID
}

interface CourseGradesMetaParams {
  courseId: CourseID
}

export const fetchCourseGrades = (
  payload: CourseGradesFetchParams,
  meta: CourseGradesMetaParams
) => ({
  type: COURSE_GRADES_FETCH as typeof COURSE_GRADES_FETCH,
  payload,
  meta,
})

export const fetchCourseGradesSuccess = (
  payload: any,
  meta: CourseGradesMetaParams
) => ({
  type: COURSE_GRADES_FETCH_SUCCESS as typeof COURSE_GRADES_FETCH_SUCCESS,
  payload,
  meta,
})

export const fetchCourseGradesFailure = (
  payload: Error,
  meta: CourseGradesMetaParams
) => ({
  type: COURSE_GRADES_FETCH_FAILURE as typeof COURSE_GRADES_FETCH_FAILURE,
  payload,
  meta,
})

export const fetchCourseGradesCancel = (
  payload: any,
  meta: CourseGradesMetaParams
) => ({
  type: COURSE_GRADES_FETCH_CANCEL as typeof COURSE_GRADES_FETCH_CANCEL,
  payload,
  meta,
})

export type CourseGradesActionTypes =
  | ReturnType<typeof fetchCourseGrades>
  | ReturnType<typeof fetchCourseGradesSuccess>
  | ReturnType<typeof fetchCourseGradesFailure>
  | ReturnType<typeof fetchCourseGradesCancel>
