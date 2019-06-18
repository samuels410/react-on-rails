import * as types from './Courses.types'
import { CourseID, ProgramID } from '../../../common/types'

export interface CourseDetailsFetchParams {
  courseId: CourseID
  include?: string[]
}
export interface CourseDetailsFetchMetaParams {
  courseId: CourseID
}
export interface CourseListFetchMetaParams {
  programId: ProgramID
}

export const fetchCourseList = (meta: CourseListFetchMetaParams) => ({
  type: types.COURSE_LIST_FETCH as typeof types.COURSE_LIST_FETCH,
  meta,
})

export const fetchCourseListFailure = (
  payload: Error,
  meta: CourseListFetchMetaParams
) => ({
  type: types.COURSE_LIST_FETCH_FAILURE as typeof types.COURSE_LIST_FETCH_FAILURE,
  payload,
  meta,
})

export const fetchCourseListSuccess = (
  payload: any,
  meta: CourseListFetchMetaParams
) => ({
  type: types.COURSE_LIST_FETCH_SUCCESS as typeof types.COURSE_LIST_FETCH_SUCCESS,
  payload,
  meta,
})

export const fetchCourseListCancel = (
  meta: CourseListFetchMetaParams,
  payload?: any
) => ({
  type: types.COURSE_LIST_FETCH_CANCEL as typeof types.COURSE_LIST_FETCH_CANCEL,
  payload,
  meta,
})

export const fetchCourseDetails = (
  payload: CourseDetailsFetchParams,
  meta: CourseDetailsFetchMetaParams
) => ({
  type: types.COURSE_DETAILS_FETCH as typeof types.COURSE_DETAILS_FETCH,
  payload,
  meta,
})

export const fetchCourseDetailsSuccess = (
  payload: any,
  meta: CourseDetailsFetchMetaParams
) => ({
  type: types.COURSE_DETAILS_FETCH_SUCCESS as typeof types.COURSE_DETAILS_FETCH_SUCCESS,
  payload,
  meta,
})
export const fetchCourseDetailsFailure = (
  payload: Error,
  meta: CourseDetailsFetchMetaParams
) => ({
  type: types.COURSE_DETAILS_FETCH_FAILURE as typeof types.COURSE_DETAILS_FETCH_FAILURE,
  payload,
  meta,
})
export const fetchCourseDetailsCancel = (
  payload: any,
  meta: CourseDetailsFetchMetaParams
) => ({
  type: types.COURSE_DETAILS_FETCH_CANCEL as typeof types.COURSE_DETAILS_FETCH_CANCEL,
  payload,
  meta,
})

export type CourseListActions =
  | ReturnType<typeof fetchCourseList>
  | ReturnType<typeof fetchCourseListFailure>
  | ReturnType<typeof fetchCourseListSuccess>
  | ReturnType<typeof fetchCourseListCancel>
  | ReturnType<typeof fetchCourseDetails>
  | ReturnType<typeof fetchCourseDetailsSuccess>
  | ReturnType<typeof fetchCourseDetailsFailure>
  | ReturnType<typeof fetchCourseDetailsCancel>
