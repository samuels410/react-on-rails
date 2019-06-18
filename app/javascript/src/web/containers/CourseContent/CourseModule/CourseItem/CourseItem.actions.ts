import { ItemID } from '../../../../../common/types'
import {
  COURSE_ITEM_CONTENT_FETCH,
  COURSE_ITEM_CONTENT_FETCH_CANCEL,
  COURSE_ITEM_CONTENT_FETCH_FAILURE,
  COURSE_ITEM_CONTENT_FETCH_SUCCESS,
} from './CourseItem.types'

export interface CourseItemContentFetchParams {
  url: string
}

export interface CourseModuleItemMetaParams {
  itemId: ItemID
}

export const fetchCourseItemContent = (
  payload: CourseItemContentFetchParams,
  meta: CourseModuleItemMetaParams
) => ({
  type: COURSE_ITEM_CONTENT_FETCH as typeof COURSE_ITEM_CONTENT_FETCH,
  payload,
  meta,
})

export const fetchCourseItemContentFailure = (
  payload: Error,
  meta: CourseModuleItemMetaParams
) => ({
  type: COURSE_ITEM_CONTENT_FETCH_FAILURE as typeof COURSE_ITEM_CONTENT_FETCH_FAILURE,
  payload,
  meta,
})

export const fetchCourseItemContentSuccess = (
  payload: any,
  meta: CourseModuleItemMetaParams
) => ({
  type: COURSE_ITEM_CONTENT_FETCH_SUCCESS as typeof COURSE_ITEM_CONTENT_FETCH_SUCCESS,
  payload,
  meta,
})

export const fetchCourseItemContentCancel = (
  payload: any,
  meta: CourseModuleItemMetaParams
) => ({
  type: COURSE_ITEM_CONTENT_FETCH_CANCEL as typeof COURSE_ITEM_CONTENT_FETCH_CANCEL,
  payload,
  meta,
})

export type CourseItemContentActionTypes =
  | ReturnType<typeof fetchCourseItemContent>
  | ReturnType<typeof fetchCourseItemContentSuccess>
  | ReturnType<typeof fetchCourseItemContentFailure>
  | ReturnType<typeof fetchCourseItemContentCancel>
