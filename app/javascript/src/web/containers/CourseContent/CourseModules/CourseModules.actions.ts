import * as types from './CourseModules.types'
import { CourseID } from '../../../../common/types'

interface CourseModulesFetchMetaParams {
  courseId: CourseID
}

export interface CourseModulesFetchParams {
  courseId: CourseID
}

// Course Modules
export const fetchCourseModules = (
  payload: CourseModulesFetchParams,
  meta: CourseModulesFetchMetaParams
) => ({
  type: types.COURSE_MODULES_FETCH as typeof types.COURSE_MODULES_FETCH,
  payload,
  meta,
})

export const fetchCourseModulesFailure = (
  payload: Error,
  meta: CourseModulesFetchMetaParams
) => ({
  type: types.COURSE_MODULES_FETCH_FAILURE as typeof types.COURSE_MODULES_FETCH_FAILURE,
  payload,
  meta,
})

export const fetchCourseModulesSuccess = (
  payload: any,
  meta: CourseModulesFetchMetaParams
) => ({
  type: types.COURSE_MODULES_FETCH_SUCCESS as typeof types.COURSE_MODULES_FETCH_SUCCESS,
  payload,
  meta,
})

export const fetchCourseModulesCancel = (
  payload: any,
  meta: CourseModulesFetchMetaParams
) => ({
  type: types.COURSE_MODULES_FETCH_CANCEL as typeof types.COURSE_MODULES_FETCH_CANCEL,
  payload,
  meta,
})

export type CourseModulesActionTypes =
  | ReturnType<typeof fetchCourseModules>
  | ReturnType<typeof fetchCourseModulesSuccess>
  | ReturnType<typeof fetchCourseModulesFailure>
  | ReturnType<typeof fetchCourseModulesCancel>

// Course Module Items
