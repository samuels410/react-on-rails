import { takeEvery, put, call, cancelled } from 'redux-saga/effects'
import {
  fetchCourseModuleItemsSuccess,
  fetchCourseModuleItemsFailure,
  fetchCourseModuleItems,
} from './CourseModule.actions'
import * as types from './CourseModule.types'
import { cancelable, stringify } from '../../../../common/utils'
import { courseItemContentMiddleware } from './CourseItem'

export async function getCourseModuleItemsAPI(
  action: ReturnType<typeof fetchCourseModuleItems>,
  signal: AbortSignal
) {
  const { moduleId, courseId } = action.meta
  const params = stringify({
    access_token: process.env.REACT_APP_API_ACCESS_TOKEN,
    ...action.payload,
  })
  const response = await fetch(
    `${
      process.env.REACT_APP_API_URL_1
    }v1/courses/${courseId}/modules/${moduleId}/items?${params}`,
    { signal }
  )
  const responseBody = await response.json()
  return responseBody
}

function* getCourseModuleItemsHandler(
  action: ReturnType<typeof fetchCourseModuleItems>
) {
  const abortController = new AbortController()
  try {
    const data = yield call(
      getCourseModuleItemsAPI,
      action,
      abortController.signal
    )
    yield put(fetchCourseModuleItemsSuccess(data, action.meta))
  } catch (e) {
    yield put(fetchCourseModuleItemsFailure(e, action.meta))
  } finally {
    if (cancelled()) {
      abortController.abort()
    }
  }
}

export function* getCourseModuleItemsMiddleware() {
  yield takeEvery(
    types.COURSE_MODULE_ITEMS_FETCH,
    cancelable(
      getCourseModuleItemsHandler,
      types.COURSE_MODULE_ITEMS_FETCH_CANCEL
    )
  )
}

export default ([] as any).concat(
  getCourseModuleItemsMiddleware(),
  ...courseItemContentMiddleware
)
