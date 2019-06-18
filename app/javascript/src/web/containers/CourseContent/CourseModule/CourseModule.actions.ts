import { CourseID, ModuleID, ModuleItemData } from '../../../../common/types'
import * as types from './CourseModule.types'

export interface CourseModuleItemsFetchParams {
  courseId: CourseID
  moduleId: ModuleID
  include?: string[]
  page?: number
  per_page?: number
}

export interface CourseModuleItemMetaParams {
  moduleId: ModuleID
}

export const fetchCourseModuleItems = (
  payload: CourseModuleItemsFetchParams,
  meta: { courseId: CourseID } & CourseModuleItemMetaParams
) => ({
  type: types.COURSE_MODULE_ITEMS_FETCH as typeof types.COURSE_MODULE_ITEMS_FETCH,
  payload,
  meta,
})

export const fetchCourseModuleItemsFailure = (
  payload: Error,
  meta: CourseModuleItemMetaParams
) => ({
  type: types.COURSE_MODULE_ITEMS_FETCH_FAILURE as typeof types.COURSE_MODULE_ITEMS_FETCH_FAILURE,
  payload,
  meta,
})

export const fetchCourseModuleItemsSuccess = (
  payload: ModuleItemData[],
  meta: CourseModuleItemMetaParams
) => ({
  type: types.COURSE_MODULE_ITEMS_FETCH_SUCCESS as typeof types.COURSE_MODULE_ITEMS_FETCH_SUCCESS,
  payload,
  meta,
})

export const fetchCourseModuleItemsCancel = (
  payload: any,
  meta: CourseModuleItemMetaParams
) => ({
  type: types.COURSE_MODULE_ITEMS_FETCH_CANCEL as typeof types.COURSE_MODULE_ITEMS_FETCH_CANCEL,
  payload,
  meta,
})

export type BulkModuleItemsInsertParams = {
  [s in ModuleID]: { items: ModuleItemData[]; count: number }
}

export const courseModuleItemsBulkInsert = (
  payload: BulkModuleItemsInsertParams
) => ({
  type: types.COURSE_MODULE_ITEMS_BULK_INSERT as typeof types.COURSE_MODULE_ITEMS_BULK_INSERT,
  payload,
})

export type CourseModuleItemsActionTypes =
  | ReturnType<typeof fetchCourseModuleItems>
  | ReturnType<typeof fetchCourseModuleItemsSuccess>
  | ReturnType<typeof fetchCourseModuleItemsFailure>
  | ReturnType<typeof fetchCourseModuleItemsCancel>
  | ReturnType<typeof courseModuleItemsBulkInsert>
